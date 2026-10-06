import { KAKAO_JS_KEY } from '@/api/config';

/**
 * Kakao 지도 JS SDK 중 이 프로젝트가 쓰는 지도·services 라이브러리의 최소 타입.
 * @types 패키지를 추가하지 않기 위해 필요한 부분만 직접 선언한다.
 */
type KakaoStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

export type KakaoPlace = {
  id: string;
  place_name: string;
  category_group_code: string;
  address_name: string;
  road_address_name: string;
  /** "음식점 > 한식 > 육류,고기" */
  category_name: string;
  phone: string;
  /** 카카오맵 장소 상세 페이지 */
  place_url: string;
  x: string;
  y: string;
};

type KakaoRegionAddress = {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
};

export type KakaoAddress = {
  address_name: string;
  x: string;
  y: string;
  address: KakaoRegionAddress | null;
  road_address: (KakaoRegionAddress & { building_name: string }) | null;
};

export type KakaoRegion = {
  region_type: 'H' | 'B';
  region_1depth_name: string;
  region_2depth_name: string;
};

export type KakaoLatLng = {
  getLat: () => number;
  getLng: () => number;
};

export type KakaoLatLngBounds = {
  extend: (latlng: KakaoLatLng) => void;
  isEmpty: () => boolean;
};

export type KakaoMap = {
  setCenter: (latlng: KakaoLatLng) => void;
  getBounds: () => KakaoLatLngBounds;
  setBounds: (bounds: KakaoLatLngBounds) => void;
  /** 숫자가 작을수록 확대 (1 ~ 14) */
  setLevel: (level: number) => void;
  panTo: (latlng: KakaoLatLng) => void;
  addControl: (control: object, position: number) => void;
};

export type KakaoMarker = {
  setMap: (map: KakaoMap | null) => void;
  setPosition: (latlng: KakaoLatLng) => void;
};

export type Kakao = {
  maps: {
    load: (callback: () => void) => void;
    LatLng: new (lat: number, lng: number) => KakaoLatLng;
    LatLngBounds: new () => KakaoLatLngBounds;
    Map: new (container: HTMLElement, options: { center: KakaoLatLng; level?: number }) => KakaoMap;
    Marker: new (options: { position: KakaoLatLng; map?: KakaoMap }) => KakaoMarker;
    ZoomControl: new () => object;
    event: {
      addListener: (target: KakaoMap | KakaoMarker, type: 'click', handler: () => void) => void;
    };
    ControlPosition: { RIGHT: number; TOPRIGHT: number; BOTTOMRIGHT: number };
    services: {
      Status: Record<KakaoStatus, KakaoStatus>;
      Places: new () => {
        keywordSearch: (
          keyword: string,
          callback: (data: KakaoPlace[], status: KakaoStatus) => void,
          /** bounds를 주면 그 영역 안의 장소만 찾는다 */
          options?: { size?: number; bounds?: KakaoLatLngBounds },
        ) => void;
      };
      Geocoder: new () => {
        addressSearch: (
          query: string,
          callback: (data: KakaoAddress[], status: KakaoStatus) => void,
        ) => void;
        coord2RegionCode: (
          lng: number,
          lat: number,
          callback: (data: KakaoRegion[], status: KakaoStatus) => void,
        ) => void;
      };
    };
  };
};

declare global {
  interface Window {
    kakao?: Kakao;
  }
}

let loading: Promise<Kakao> | null = null;

/** SDK 스크립트를 한 번만 주입하고, 실패하면 다음 호출에서 다시 시도할 수 있게 한다. */
export const loadKakao = (): Promise<Kakao> => {
  if (loading) return loading;

  loading = new Promise<Kakao>((resolve, reject) => {
    if (!KAKAO_JS_KEY) {
      reject(new Error('VITE_KAKAO_JS_KEY가 비어 있습니다.'));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      const kakao = window.kakao;
      // 카카오 콘솔에 도메인이 등록되지 않으면 스크립트는 받아지지만 kakao 객체가 없다
      if (!kakao) {
        reject(new Error('Kakao SDK 초기화 실패 (플랫폼 도메인 등록을 확인하세요)'));
        return;
      }
      kakao.maps.load(() => resolve(kakao));
    };
    script.onerror = () => reject(new Error('Kakao SDK 로드 실패'));
    document.head.appendChild(script);
  }).catch((error) => {
    loading = null;
    throw error;
  });

  return loading;
};
