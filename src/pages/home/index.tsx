import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { type MapSearchResult, type MapSearchScope, searchMapLocations } from '@/api/map/search';
import BellIcon from '@/assets/icons/bell.svg?react';
import { MapSearchSheet, type MapSearchStatus } from '@/ui/map-search-sheet/map-search-sheet';
import { PlaceInfoCard } from '@/ui/place-info-card/place-info-card';
import { type Kakao, type KakaoMap, type KakaoMarker, loadKakao } from '@/utils/kakao';

import { type MarkerImages, createMarkerImages } from './marker-image';

import * as styles from './page.css';

// 목업: 읽지 않은 알림 수 (notification 페이지의 INITIAL_NOTIFICATIONS 개수와 동일)
const UNREAD_COUNT = 9;

// 강남역
const DEFAULT_CENTER = { lat: 37.4979, lng: 127.0276 };
// 카카오 지도 level은 작을수록 확대된다
const DEFAULT_LEVEL = 4;
// 검색 결과로 이동했을 때의 확대 수준 (건물·역 단위가 보이는 정도)
const SEARCH_RESULT_LEVEL = 3;

export const HomePage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoRef = useRef<Kakao | null>(null);
  const mapInstanceRef = useRef<KakaoMap | null>(null);
  // 처음엔 기본 위치 마커 하나, 검색 후엔 결과마다 하나씩
  const markersRef = useRef<KakaoMarker[]>([]);
  // 검색 결과 id → 마커. 선택된 가게의 마커만 강조하는 데 쓴다
  const markerByIdRef = useRef(new Map<string, KakaoMarker>());
  const markerImagesRef = useRef<MarkerImages | null>(null);
  // 빠르게 여러 번 검색했을 때 느린 응답이 최신 결과를 덮어쓰지 않도록
  const reqId = useRef(0);

  const [keyword, setKeyword] = useState('');
  const [searchStatus, setSearchStatus] = useState<MapSearchStatus | 'idle'>('idle');
  const [results, setResults] = useState<MapSearchResult[]>([]);
  const [scope, setScope] = useState<MapSearchScope>('nearby');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<MapSearchResult | null>(null);

  useEffect(() => {
    // SDK 로드 중에 페이지를 떠나면 지도를 만들지 않는다
    let cancelled = false;
    // Map 객체 자체는 바뀌지 않으므로 cleanup에서 쓸 참조를 미리 잡아둔다
    const markerById = markerByIdRef.current;

    loadKakao()
      .then((kakao) => {
        if (cancelled || !mapRef.current) return;

        const center = new kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
        const map = new kakao.maps.Map(mapRef.current, { center, level: DEFAULT_LEVEL });
        map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
        // 지도 빈 곳을 누르면 가게 정보 카드를 닫는다
        kakao.maps.event.addListener(map, 'click', () => setSelectedPlace(null));

        kakaoRef.current = kakao;
        mapInstanceRef.current = map;
        markerImagesRef.current = createMarkerImages(kakao);
        markersRef.current = [new kakao.maps.Marker({ position: center, map })];
      })
      .catch((e) => console.warn('카카오 지도 초기화 실패:', e));

    return () => {
      cancelled = true;
      reqId.current += 1;
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      markerById.clear();
      mapInstanceRef.current = null;
    };
  }, []);

  // 선택된 가게의 마커만 크고 진한 색으로 바꾸고 다른 마커보다 위에 그린다
  const selectedId = selectedPlace?.id ?? null;
  useEffect(() => {
    const images = markerImagesRef.current;
    if (!images) return;

    markerByIdRef.current.forEach((marker, id) => {
      const isSelected = id === selectedId;
      marker.setImage(isSelected ? images.selected : images.normal);
      marker.setZIndex(isSelected ? 1 : 0);
    });
  }, [selectedId, results]);

  const drawMarkers = (places: MapSearchResult[]) => {
    const kakao = kakaoRef.current;
    const map = mapInstanceRef.current;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    markerByIdRef.current.clear();
    if (!kakao || !map) return;

    markersRef.current = places.map((place) => {
      const position = new kakao.maps.LatLng(place.lat, place.lng);
      const marker = new kakao.maps.Marker({
        position,
        map,
        image: markerImagesRef.current?.normal,
      });
      kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedPlace(place);
        // 확대 수준은 그대로 두고 누른 마커를 화면 중앙으로 부드럽게 옮긴다
        map.panTo(position);
      });
      markerByIdRef.current.set(place.id, marker);
      return marker;
    });
  };

  const handleSearch = async () => {
    const query = keyword.trim();
    if (!query) return;

    const myReq = ++reqId.current;
    setSearchStatus('searching');
    setIsSheetOpen(true);
    setSelectedPlace(null);

    try {
      // 검색하는 순간 보고 있는 지도 화면을 검색 범위로 쓴다
      const bounds = mapInstanceRef.current?.getBounds();
      const response = await searchMapLocations(query, bounds);
      if (myReq !== reqId.current) return;

      setResults(response.results);
      setScope(response.scope);
      setSearchStatus('done');
      drawMarkers(response.results);
    } catch {
      if (myReq !== reqId.current) return;

      setResults([]);
      setSearchStatus('error');
      drawMarkers([]);
    }
  };

  const handleClear = () => {
    reqId.current += 1;
    setKeyword('');
    setResults([]);
    setSearchStatus('idle');
    setIsSheetOpen(false);
    setSelectedPlace(null);
    drawMarkers([]);
  };

  const handleShowAll = () => {
    setIsSheetOpen(false);

    const kakao = kakaoRef.current;
    const map = mapInstanceRef.current;
    if (!kakao || !map || results.length === 0) return;

    const bounds = new kakao.maps.LatLngBounds();
    results.forEach((place) => bounds.extend(new kakao.maps.LatLng(place.lat, place.lng)));
    map.setBounds(bounds);
  };

  const handleSelectLocation = (place: MapSearchResult) => {
    setSelectedPlace(place);

    const kakao = kakaoRef.current;
    const map = mapInstanceRef.current;
    if (!kakao || !map) {
      console.warn('지도를 사용할 수 없어 검색 위치로 이동하지 못했습니다.');
      return;
    }

    map.setLevel(SEARCH_RESULT_LEVEL);
    map.panTo(new kakao.maps.LatLng(place.lat, place.lng));
  };

  return (
    <div className={styles.container}>
      {/* ── 검색바 ── */}
      <div className={styles.searchBar}>
        <span aria-hidden>🔍</span>
        <input
          className={styles.searchInput}
          placeholder="카페, 삼겹살, 강남역, 테헤란로 152"
          value={keyword}
          enterKeyHint="search"
          onChange={(e) => setKeyword(e.target.value)}
          // 결과 시트를 닫아둔 상태에서 검색바를 누르면 이전 결과를 다시 보여준다
          onFocus={() => searchStatus !== 'idle' && setIsSheetOpen(true)}
          onKeyDown={(e) => {
            // 한글 조합 중 Enter는 무시 (조합 확정과 제출이 겹치는 문제)
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              e.currentTarget.blur();
              handleSearch();
            }
          }}
        />
        {keyword && (
          <button className={styles.clearButton} onClick={handleClear} aria-label="검색어 지우기">
            ✕
          </button>
        )}
      </div>

      {/* ── 알람 버튼 (플로팅) ── */}
      <button
        className={styles.alarmButton}
        onClick={() => navigate(`/meeting/${roomId}/notification`)}
      >
        <BellIcon className={styles.bellIcon} />
        {UNREAD_COUNT > 0 && <span className={styles.alarmBadge}>{UNREAD_COUNT}</span>}
      </button>

      {/* ── 카카오 지도 ── */}
      <div ref={mapRef} className={styles.mapArea} />

      {/* 가게 정보 카드가 열려 있으면 결과 시트는 잠시 숨긴다 (카드를 닫으면 다시 보인다) */}
      {selectedPlace ? (
        <PlaceInfoCard place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      ) : (
        isSheetOpen &&
        searchStatus !== 'idle' && (
          <MapSearchSheet
            status={searchStatus}
            results={results}
            scope={scope}
            onSelect={handleSelectLocation}
            onShowAll={handleShowAll}
            onClose={() => setIsSheetOpen(false)}
          />
        )
      )}
    </div>
  );
};
