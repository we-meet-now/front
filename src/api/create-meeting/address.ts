export type AddressSearchResult = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

/**
 * 주소 검색 서버 API가 아직 없어 클라이언트 고정 목록으로 대체한다.
 * 좌표를 함께 들고 있어야 중간위치를 하드코딩하지 않고 실제로 계산할 수 있다.
 * 실제 API가 생기면 아래 searchAddresses 하나만 교체하면 된다.
 */
const ADDRESSES: AddressSearchResult[] = [
  {
    id: 'gangnam',
    name: '강남역',
    address: '서울 강남구 강남대로 396',
    lat: 37.4979,
    lng: 127.0276,
  },
  {
    id: 'yeoksam',
    name: '역삼역',
    address: '서울 강남구 테헤란로 156',
    lat: 37.5006,
    lng: 127.0364,
  },
  {
    id: 'seolleung',
    name: '선릉역',
    address: '서울 강남구 테헤란로 340',
    lat: 37.5045,
    lng: 127.049,
  },
  {
    id: 'samseong',
    name: '삼성역',
    address: '서울 강남구 영동대로 513',
    lat: 37.5088,
    lng: 127.0631,
  },
  {
    id: 'sadang',
    name: '사당역',
    address: '서울 동작구 남부순환로 2089',
    lat: 37.4766,
    lng: 126.9816,
  },
  {
    id: 'seocho',
    name: '서초역',
    address: '서울 서초구 서초대로 314',
    lat: 37.4924,
    lng: 127.0078,
  },
  {
    id: 'gyodae',
    name: '교대역',
    address: '서울 서초구 서초대로 227',
    lat: 37.4936,
    lng: 127.0143,
  },
  {
    id: 'sinsa',
    name: '신사역',
    address: '서울 강남구 강남대로 지하 636',
    lat: 37.5162,
    lng: 127.0201,
  },
  {
    id: 'hongdae',
    name: '홍대입구역',
    address: '서울 마포구 양화로 160',
    lat: 37.5571,
    lng: 126.9245,
  },
  { id: 'hapjeong', name: '합정역', address: '서울 마포구 양화로 45', lat: 37.5495, lng: 126.9137 },
  {
    id: 'gongdeok',
    name: '공덕역',
    address: '서울 마포구 백범로 187',
    lat: 37.5443,
    lng: 126.9515,
  },
  {
    id: 'sinchon',
    name: '신촌역',
    address: '서울 서대문구 신촌로 90',
    lat: 37.5551,
    lng: 126.9368,
  },
  {
    id: 'jongno3',
    name: '종로3가역',
    address: '서울 종로구 종로 129',
    lat: 37.5704,
    lng: 126.9922,
  },
  {
    id: 'euljiro3',
    name: '을지로3가역',
    address: '서울 중구 을지로 100',
    lat: 37.5663,
    lng: 126.9919,
  },
  {
    id: 'seoulstation',
    name: '서울역',
    address: '서울 중구 한강대로 405',
    lat: 37.5547,
    lng: 126.9707,
  },
  {
    id: 'yongsan',
    name: '용산역',
    address: '서울 용산구 한강대로 23길 55',
    lat: 37.5299,
    lng: 126.9648,
  },
  {
    id: 'itaewon',
    name: '이태원역',
    address: '서울 용산구 이태원로 177',
    lat: 37.5345,
    lng: 126.9946,
  },
  {
    id: 'wangsimni',
    name: '왕십리역',
    address: '서울 성동구 왕십리광장로 17',
    lat: 37.5614,
    lng: 127.0374,
  },
  {
    id: 'konkuk',
    name: '건대입구역',
    address: '서울 광진구 아차산로 262',
    lat: 37.5404,
    lng: 127.0704,
  },
  {
    id: 'jamsil',
    name: '잠실역',
    address: '서울 송파구 올림픽로 265',
    lat: 37.5133,
    lng: 127.1001,
  },
  {
    id: 'cheonho',
    name: '천호역',
    address: '서울 강동구 천호대로 1005',
    lat: 37.5385,
    lng: 127.1237,
  },
  { id: 'nowon', name: '노원역', address: '서울 노원구 상계로 65', lat: 37.6551, lng: 127.0614 },
  {
    id: 'sungshin',
    name: '성신여대입구역',
    address: '서울 성북구 동소문로 102',
    lat: 37.5926,
    lng: 127.0163,
  },
  {
    id: 'yeouido',
    name: '여의도역',
    address: '서울 영등포구 여의나루로 40',
    lat: 37.5215,
    lng: 126.9243,
  },
  {
    id: 'yeongdeungpo',
    name: '영등포역',
    address: '서울 영등포구 경인로 846',
    lat: 37.5157,
    lng: 126.9074,
  },
  {
    id: 'guro',
    name: '구로디지털단지역',
    address: '서울 구로구 시흥대로 578',
    lat: 37.4853,
    lng: 126.9015,
  },
  {
    id: 'mokdong',
    name: '목동역',
    address: '서울 양천구 오목로 지하 340',
    lat: 37.5262,
    lng: 126.8752,
  },
  {
    id: 'bupyeong',
    name: '부평역',
    address: '인천 부평구 경인로 지하 856',
    lat: 37.4894,
    lng: 126.7244,
  },
  {
    id: 'incheon',
    name: '인천시청역',
    address: '인천 남동구 정각로 29',
    lat: 37.4576,
    lng: 126.7318,
  },
  { id: 'bucheon', name: '부천역', address: '경기 부천시 부천로 1', lat: 37.4844, lng: 126.783 },
  {
    id: 'anyang',
    name: '안양역',
    address: '경기 안양시 만안구 만안로 232',
    lat: 37.4018,
    lng: 126.9227,
  },
  {
    id: 'suwon',
    name: '수원역',
    address: '경기 수원시 팔달구 덕영대로 924',
    lat: 37.2659,
    lng: 127.0001,
  },
  { id: 'dongtan', name: '동탄역', address: '경기 화성시 동탄대로 1', lat: 37.2013, lng: 127.0983 },
  {
    id: 'dongtanro',
    name: '동탄대로 123',
    address: '경기 화성시 동탄대로 123길',
    lat: 37.2035,
    lng: 127.1024,
  },
  {
    id: 'seongnam',
    name: '성남시청',
    address: '경기 성남시 중원구 여수대로 33',
    lat: 37.42,
    lng: 127.1265,
  },
  {
    id: 'pangyo',
    name: '판교역',
    address: '경기 성남시 분당구 판교역로 160',
    lat: 37.3947,
    lng: 127.1112,
  },
  {
    id: 'jeongja',
    name: '정자역',
    address: '경기 성남시 분당구 성남대로 지하 331',
    lat: 37.3671,
    lng: 127.1082,
  },
  {
    id: 'ilsan',
    name: '일산역',
    address: '경기 고양시 일산서구 중앙로 1554',
    lat: 37.6819,
    lng: 126.7699,
  },
  {
    id: 'ujangsan',
    name: '고양시청',
    address: '경기 고양시 덕양구 고양시청로 10',
    lat: 37.6584,
    lng: 126.832,
  },
  {
    id: 'gwangmyeong',
    name: '광명역',
    address: '경기 광명시 KTX광명역로 21',
    lat: 37.4163,
    lng: 126.8845,
  },
];

const normalize = (value: string) => value.replace(/\s+/g, '').toLowerCase();

/** 검색어를 이름·주소에 부분일치시킨다. 결과가 없으면 빈 배열(= "검색 결과가 없어요"). */
export const searchAddresses = async (keyword: string): Promise<AddressSearchResult[]> => {
  const query = normalize(keyword);
  if (!query) return [];

  await new Promise((r) => setTimeout(r, 300));

  return ADDRESSES.filter((item) =>
    normalize(`${item.name} ${item.address}`).includes(query),
  ).slice(0, 20);
};

/** 좌표에 가장 가까운 지점. 역지오코딩 API가 없어 중간위치 라벨링에 쓰는 대체 수단이다. */
export const findNearestAddress = (lat: number, lng: number): AddressSearchResult => {
  let nearest = ADDRESSES[0];
  let shortest = Infinity;

  for (const item of ADDRESSES) {
    const distance = (item.lat - lat) ** 2 + (item.lng - lng) ** 2;
    if (distance < shortest) {
      shortest = distance;
      nearest = item;
    }
  }

  return nearest;
};
