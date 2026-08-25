import { useRef, useState } from 'react';

import { findNearestAddress, searchAddresses } from '@/api/create-meeting/address';
import type { AddressSearchResult } from '@/api/create-meeting/address';
import { Popup } from '@/ui/popup/popup';

import * as styles from './address-search-modal.css';

type AddressSearchModalProps = {
  onSelect: (result: AddressSearchResult) => void;
  onClose: () => void;
  /** 위치 권한 거부·실패·미지원 — 부모가 E10 토스트를 띄운다 */
  onLocationError: () => void;
};

type SearchStatus = 'idle' | 'searching' | 'done';

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

    const found = await searchAddresses(query);
    if (myReq !== reqId.current) return;

    setResults(found);
    setStatus('done');
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
      ({ coords }) => {
        if (!mountedRef.current) return;
        setIsLocating(false);

        // 역지오코딩 API가 없어 가장 가까운 알려진 지점으로 라벨링한다.
        // 좌표 자체는 실제 값이라 중간위치 계산에는 그대로 쓸 수 있다.
        const nearest = findNearestAddress(coords.latitude, coords.longitude);
        setPicked({
          id: 'current-location',
          name: '현재 위치',
          address: `${nearest.name} 근처`,
          lat: coords.latitude,
          lng: coords.longitude,
        });
        setKeyword(`${nearest.name} 근처`);
      },
      () => {
        if (!mountedRef.current) return;
        setIsLocating(false);
        onLocationError();
      },
      { timeout: 8000, maximumAge: 60000 },
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
            placeholder="출발지를 입력해주세요"
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
                <span className={styles.resultAddress}>{result.address}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>검색 결과가 없어요</p>
        ))}
    </Popup>
  );
};
