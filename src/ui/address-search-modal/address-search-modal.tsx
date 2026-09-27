import { useRef, useState } from 'react';

import { getRegionByCoord, searchAddresses } from '@/api/create-meeting/address';
import type { AddressSearchResult } from '@/api/create-meeting/address';
import { Popup } from '@/ui/popup/popup';

import * as styles from './address-search-modal.css';

type AddressSearchModalProps = {
  onSelect: (result: AddressSearchResult) => void;
  onClose: () => void;
  /** 위치 권한 거부·실패·미지원 — 부모가 E10 토스트를 띄운다 */
  onLocationError: () => void;
};

type SearchStatus = 'idle' | 'searching' | 'done' | 'error';

export const AddressSearchModal = ({
  onSelect,
  onClose,
  onLocationError,
}: AddressSearchModalProps) => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<AddressSearchResult[]>([]);
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [picked, setPicked] = useState<AddressSearchResult | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // 빠르게 여러 번 검색했을 때 느린 응답이 최신 결과를 덮어쓰지 않도록
  const reqId = useRef(0);
  // 모달이 닫힌 뒤 위치 콜백이 늦게 도착하는 경우를 막는다
  const mountedRef = useRef(true);

  const handleSearch = async () => {
    const query = keyword.trim();
    if (!query) return;

    const myReq = ++reqId.current;
    setStatus('searching');

    try {
      const found = await searchAddresses(query);
      if (myReq !== reqId.current) return;

      setResults(found);
      setStatus('done');
    } catch {
      if (myReq !== reqId.current) return;

      setResults([]);
      setStatus('error');
    }
  };

  const handleClear = () => {
    reqId.current += 1;
    setKeyword('');
    setResults([]);
    setStatus('idle');
    setPicked(null);
  };

  const handleLocate = () => {
    if (!('geolocation' in navigator)) {
      onLocationError();
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          // 정밀 좌표는 시군구 변환에만 쓰고 저장·전송하지 않는다
          const region = await getRegionByCoord(coords.latitude, coords.longitude);
          if (!mountedRef.current) return;

          setPicked({ id: 'current-location', name: '현재 위치', address: region });
          setKeyword(region);
        } catch {
          if (mountedRef.current) onLocationError();
        } finally {
          if (mountedRef.current) setIsLocating(false);
        }
      },
      () => {
        if (!mountedRef.current) return;
        setIsLocating(false);
        onLocationError();
      },
      // 시군구만 필요하므로 고정밀 GPS는 켜지 않는다 (더 빠르고 배터리 절약)
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 },
    );
  };

  const handleClose = () => {
    mountedRef.current = false;
    onClose();
  };

  const handlePick = (result: AddressSearchResult) => {
    mountedRef.current = false;
    onSelect(result);
  };

  return (
    <Popup
      title="출발지 검색"
      width={340}
      onClose={handleClose}
      footer={
        <button
          className={styles.submitButton}
          disabled={!picked}
          onClick={() => picked && handlePick(picked)}
        >
          등록하기
        </button>
      }
    >
      <div className={styles.searchRow}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            placeholder="예) 강남구, 강남역, 분당"
            value={keyword}
            autoFocus
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              // 한글 조합 중 Enter는 무시 (조합 확정과 제출이 겹치는 문제)
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleSearch();
            }}
          />
          {keyword && (
            <button className={styles.clearButton} onClick={handleClear} aria-label="입력 지우기">
              ✕
            </button>
          )}
        </div>
        <button
          className={styles.searchButton}
          onClick={handleSearch}
          disabled={!keyword.trim() || status === 'searching'}
        >
          {status === 'searching' ? '검색중' : '검색'}
        </button>
      </div>

      <button className={styles.locationButton} onClick={handleLocate} disabled={isLocating}>
        ◎ {isLocating ? '위치를 불러오는 중...' : '내 위치 불러오기'}
      </button>

      {picked && <p className={styles.emptyText}>🔒 다른 사람에게는 '{picked.address}'로 보여요</p>}

      {status === 'done' &&
        (results.length > 0 ? (
          <div className={styles.resultList}>
            {results.map((result) => (
              <button
                key={result.id}
                className={styles.resultItem}
                onClick={() => handlePick(result)}
              >
                <span className={styles.resultName}>{result.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>
            검색 결과가 없어요. 구·시 이름이나 역 이름으로 검색해 보세요
          </p>
        ))}

      {status === 'error' && (
        <p className={styles.emptyText}>검색 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요</p>
      )}
    </Popup>
  );
};
