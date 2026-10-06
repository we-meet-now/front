import type { MapSearchResult, MapSearchScope } from '@/api/map/search';

import * as styles from './map-search-sheet.css';

export type MapSearchStatus = 'searching' | 'done' | 'error';

type MapSearchSheetProps = {
  status: MapSearchStatus;
  results: MapSearchResult[];
  scope: MapSearchScope;
  onSelect: (result: MapSearchResult) => void;
  /** 결과 전체가 보이도록 지도를 맞춘다 */
  onShowAll: () => void;
  onClose: () => void;
};

/**
 * 지도 위에 떠 있는 검색 결과 시트.
 * 지도·검색바를 계속 조작할 수 있도록 화면을 덮는 오버레이 없이 하단에만 붙는다.
 */
export const MapSearchSheet = ({
  status,
  results,
  scope,
  onSelect,
  onShowAll,
  onClose,
}: MapSearchSheetProps) => {
  return (
    <section className={styles.sheet} aria-label="장소 검색 결과">
      <div className={styles.handle} />

      <div className={styles.header}>
        <span className={styles.title}>
          검색 결과{status === 'done' && results.length > 0 && ` ${results.length}`}
        </span>
        <button className={styles.closeButton} onClick={onClose} aria-label="검색 결과 닫기">
          ✕
        </button>
      </div>

      {status === 'searching' && <p className={styles.emptyText}>검색 중이에요...</p>}

      {status === 'done' &&
        (results.length > 0 ? (
          <>
            <div className={styles.resultHeader}>
              <span className={styles.scopeText}>
                {scope === 'nearby'
                  ? '현재 지도 화면 주변 결과'
                  : '화면 주변에 없어 전체 지역에서 찾았어요'}
              </span>
              <button className={styles.showAllButton} onClick={onShowAll}>
                지도에서 보기
              </button>
            </div>
            <div className={styles.resultList}>
              {results.map((result) => (
                <button
                  key={result.id}
                  className={styles.resultItem}
                  onClick={() => onSelect(result)}
                >
                  <span className={styles.resultName}>
                    {result.name}
                    {result.category && (
                      <span className={styles.resultCategory}>{result.category}</span>
                    )}
                  </span>
                  {result.detail && <span className={styles.resultAddress}>{result.detail}</span>}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className={styles.emptyText}>
            검색 결과가 없어요. 업종·장소 이름이나 도로명·지번 주소로 검색해 보세요
          </p>
        ))}

      {status === 'error' && (
        <p className={styles.emptyText}>검색 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요</p>
      )}
    </section>
  );
};
