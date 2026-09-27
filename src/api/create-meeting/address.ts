import { type KakaoAddress, type KakaoPlace, loadKakao } from '@/utils/kakao';

/**
 * 출발지는 시군구 단위로만 다룬다 ("서울 강남구", "경기 성남시 분당구").
 * 상세주소·장소명·좌표는 검색 매칭에만 쓰고 결과에 담지 않는다.
 */
export type AddressSearchResult = {
  id: string;
  name: string;
  /** 저장·공유·중간위치 API에 쓰이는 값. name과 같은 시군구 라벨이다. */
  address: string;
  lat?: number;
  lng?: number;
};

const MAX_RESULTS = 15;

const SIDO_SHORT: Record<string, string> = {
  서울특별시: '서울',
  부산광역시: '부산',
  대구광역시: '대구',
  인천광역시: '인천',
  광주광역시: '광주',
  대전광역시: '대전',
  울산광역시: '울산',
  세종특별자치시: '세종',
  경기도: '경기',
  강원도: '강원',
  강원특별자치도: '강원',
  충청북도: '충북',
  충청남도: '충남',
  전라북도: '전북',
  전북특별자치도: '전북',
  전라남도: '전남',
  경상북도: '경북',
  경상남도: '경남',
  제주특별자치도: '제주',
};

const shortSido = (sido: string) => SIDO_SHORT[sido] ?? sido;

/** "경기 성남시 분당구" → 시·구가 함께 있는 곳까지 포함해 시군구 라벨을 만든다. */
const toRegionLabel = (sido: string, sigungu: string) =>
  [shortSido(sido), sigungu].filter(Boolean).join(' ');

/** "서울 강남구 역삼동 123-4" 같은 주소 문자열에서 시군구까지만 잘라낸다. */
const regionFromAddressName = (addressName: string) => {
  const [sido, second, third] = addressName.split(/\s+/);
  if (!sido) return '';

  const parts = [shortSido(sido)];
  if (second && /(시|군|구)$/.test(second)) {
    parts.push(second);
    // 성남시 분당구처럼 일반구가 있는 시
    if (third && second.endsWith('시') && third.endsWith('구')) parts.push(third);
  }
  return parts.join(' ');
};

const regionOfPlace = (place: KakaoPlace) => regionFromAddressName(place.address_name);

const regionOfAddress = (item: KakaoAddress) => {
  const region = item.address ?? item.road_address;
  return region
    ? toRegionLabel(region.region_1depth_name, region.region_2depth_name)
    : regionFromAddressName(item.address_name);
};

/** "서울"처럼 시도만 있는 결과는 너무 넓어 제외한다. 시군구가 없는 세종은 예외. */
const isSigunguLevel = (label: string) => label.includes(' ') || label === '세종';

const searchPlaces = async (keyword: string) => {
  const kakao = await loadKakao();
  const { Places, Status } = kakao.maps.services;

  return new Promise<string[]>((resolve, reject) => {
    new Places().keywordSearch(
      keyword,
      (data, status) => {
        if (status === Status.OK) resolve(data.map(regionOfPlace));
        else if (status === Status.ZERO_RESULT) resolve([]);
        else reject(new Error('장소 검색 실패'));
      },
      { size: MAX_RESULTS },
    );
  });
};

const searchRoadAddresses = async (keyword: string) => {
  const kakao = await loadKakao();
  const { Geocoder, Status } = kakao.maps.services;

  return new Promise<string[]>((resolve, reject) => {
    new Geocoder().addressSearch(keyword, (data, status) => {
      if (status === Status.OK) resolve(data.map(regionOfAddress));
      else if (status === Status.ZERO_RESULT) resolve([]);
      else reject(new Error('주소 검색 실패'));
    });
  });
};

/**
 * 지역명("강남구"), 장소 이름("강남역"), 주소("테헤란로 152")로 검색해
 * 해당하는 시군구 목록을 중복 없이 돌려준다.
 * 결과가 없으면 빈 배열(= "검색 결과가 없어요"), SDK·네트워크 오류는 throw.
 */
export const searchAddresses = async (keyword: string): Promise<AddressSearchResult[]> => {
  const query = keyword.trim();
  if (!query) return [];

  const [places, addresses] = await Promise.allSettled([
    searchPlaces(query),
    searchRoadAddresses(query),
  ]);

  // 둘 다 실패했을 때만 오류로 본다. 한쪽만 실패하면 나머지 결과라도 보여준다.
  if (places.status === 'rejected' && addresses.status === 'rejected') throw places.reason;

  // 주소 검색은 "강남구"처럼 지역명을 직접 입력한 경우라 먼저 보여준다
  const labels = [
    ...(addresses.status === 'fulfilled' ? addresses.value : []),
    ...(places.status === 'fulfilled' ? places.value : []),
  ].filter(isSigunguLevel);

  return [...new Set(labels)]
    .slice(0, MAX_RESULTS)
    .map((label) => ({ id: `region-${label}`, name: label, address: label }));
};

/** 현재 위치 좌표를 시군구 라벨로 바꾼다. 좌표는 이 함수 밖으로 내보내지 않는다. */
export const getRegionByCoord = async (lat: number, lng: number): Promise<string> => {
  const kakao = await loadKakao();
  const { Geocoder, Status } = kakao.maps.services;

  return new Promise((resolve, reject) => {
    new Geocoder().coord2RegionCode(lng, lat, (data, status) => {
      // 'H' 행정동 / 'B' 법정동 — 시군구 이름은 둘이 같다
      const region = data?.find((item) => item.region_type === 'H') ?? data?.[0];
      if (status !== Status.OK || !region) {
        reject(new Error('현재 위치의 지역을 찾지 못했습니다'));
        return;
      }
      resolve(toRegionLabel(region.region_1depth_name, region.region_2depth_name));
    });
  });
};
