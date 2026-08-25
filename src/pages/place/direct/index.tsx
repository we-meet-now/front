import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { AddressSearchResult } from '@/api/create-meeting/address';
import { AddressSearchModal } from '@/ui/address-search-modal/address-search-modal';
import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';
import { Toast } from '@/ui/toast/toast';
import { cx } from '@/ui/utils';

import { type DeparturePoint, saveDeparturePoints } from '../guest-session';

import * as styles from '../page.css';

const MIN_ROWS = 2;
const MAX_ROWS = 8;

export const GuestDirectPage = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState<DeparturePoint[]>([
    { id: 'row-0', address: '' },
    { id: 'row-1', address: '' },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showLocationError, setShowLocationError] = useState(false);

  // 모듈 전역 카운터는 마운트 간에 살아남아 id가 충돌하므로 컴포넌트 단위로 둔다
  const nextId = useRef(MIN_ROWS);

  const filledCount = rows.filter((row) => row.address.trim()).length;
  const canCalculate = filledCount >= MIN_ROWS;

  const addRow = () => {
    if (rows.length >= MAX_ROWS) return;
    setRows((prev) => [...prev, { id: `row-${nextId.current++}`, address: '' }]);
  };

  /** 기본 2행은 값만 비우고 행은 남긴다. 추가된 3행부터는 행 자체를 삭제한다. */
  const handleRemove = (id: string) => {
    setRows((prev) => {
      const index = prev.findIndex((row) => row.id === id);
      if (index < 0) return prev;
      if (index < MIN_ROWS) {
        return prev.map((row) => (row.id === id ? { id: row.id, address: '' } : row));
      }
      return prev.filter((row) => row.id !== id);
    });
  };

  const handleSelectAddress = (result: AddressSearchResult) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === editingId
          ? {
              ...row,
              address: result.address,
              placeName: result.name,
              lat: result.lat,
              lng: result.lng,
            }
          : row,
      ),
    );
    setEditingId(null);
  };

  const handleCalculate = () => {
    if (!canCalculate) return;
    saveDeparturePoints(rows.filter((row) => row.address.trim()));
    navigate('/place/midpoint');
  };

  return (
    <PageLayout
      header={
        <AppBar title="모임장소 정하기" showBackButton onBackClick={() => navigate('/place')} />
      }
      footer={
        <div className={styles.footer}>
          <button
            className={styles.primaryButton}
            disabled={!canCalculate}
            onClick={handleCalculate}
          >
            중간위치 찾기
          </button>
        </div>
      }
    >
      <div className={styles.body}>
        {/* 스텝 표시 */}
        <div className={styles.stepIndicator}>
          <div className={cx(styles.stepCircle, styles.stepCircleActive)}>1</div>
          <div className={styles.stepLine} />
          <div className={styles.stepCircle}>2</div>
        </div>
        <p className={styles.caption} style={{ marginTop: 8, marginBottom: 0 }}>
          중간위치 찾기 · 모임장소 추천
        </p>

        <h2 className={styles.pageTitle}>
          출발지를 입력하고,
          <br />
          중간위치를 찾아보세요!
        </h2>

        <div style={{ marginTop: 16 }}>
          {rows.map((row, index) => (
            <div key={row.id} className={styles.inputRow}>
              <span className={styles.departureIndex} style={{ lineHeight: '50px' }}>
                {index + 1}.
              </span>
              <button
                className={cx(styles.departureValue, !row.address && styles.departureValueEmpty)}
                onClick={() => setEditingId(row.id)}
              >
                {row.address || '출발지를 입력해 주세요'}
              </button>
              <button
                className={styles.removeButton}
                onClick={() => handleRemove(row.id)}
                aria-label={`${index + 1}번 출발지 지우기`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          className={styles.outlineButton}
          style={{ marginTop: 4 }}
          onClick={addRow}
          disabled={rows.length >= MAX_ROWS}
        >
          ＋ 모임 인원 추가하기
        </button>
        <p className={styles.caption} style={{ marginTop: 10 }}>
          {rows.length < MAX_ROWS
            ? `최대 ${MAX_ROWS}명까지 입력할 수 있어요`
            : '최대 인원에 도달했어요'}
        </p>

        <button className={styles.textButton} onClick={() => navigate('/place/share')}>
          친구들에게 물어볼까요?
        </button>
      </div>

      {editingId && (
        <AddressSearchModal
          onSelect={handleSelectAddress}
          onClose={() => setEditingId(null)}
          onLocationError={() => setShowLocationError(true)}
        />
      )}

      {showLocationError && (
        <Toast
          title="현재 위치를 불러올 수 없어요"
          description="출발지를 직접 검색해 주세요"
          onClose={() => setShowLocationError(false)}
        />
      )}
    </PageLayout>
  );
};
