import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddressSearchSheet } from '@/ui/address-search-sheet/address-search-sheet';
import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';

import * as styles from '../page.css';

type DeparturePoint = {
  id: number;
  name: string;
  address: string;
};

let nextId = 3;

export const GuestDirectPage = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState<DeparturePoint[]>([
    { id: 1, name: '나', address: '' },
    { id: 2, name: '', address: '' },
  ]);
  const [addressSheetTargetId, setAddressSheetTargetId] = useState<number | null>(null);

  const updatePoint = (id: number, field: 'name' | 'address', value: string) => {
    setPoints((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const addRow = () => {
    if (points.length >= 10) return;
    setPoints((prev) => [...prev, { id: nextId++, name: '', address: '' }]);
  };

  const removeRow = (id: number) => {
    if (points.length <= 2) return;
    setPoints((prev) => prev.filter((p) => p.id !== id));
  };

  const filledCount = points.filter((p) => p.address.trim()).length;
  const canCalculate = filledCount >= 2;

  const handleCalculate = () => {
    sessionStorage.setItem('guest_direct_points', JSON.stringify(points));
    navigate('/place/midpoint');
  };

  return (
    <>
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
            <div className={`${styles.stepCircle} ${styles.stepCircleActive}`}>1</div>
            <div className={styles.stepLine} />
            <div className={styles.stepCircle}>2</div>
          </div>
          <p className={styles.caption} style={{ marginTop: 8, marginBottom: 0 }}>
            중간위치 찾기 · 모임장소 추천
          </p>

          <h2
            style={{
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: '-0.6px',
              lineHeight: 1.3,
              marginTop: 20,
              marginBottom: 6,
            }}
          >
            출발지를 입력하고,
            <br />
            중간위치를 찾아보세요!
          </h2>

          <div style={{ marginTop: 16 }}>
            {points.map((point, idx) => (
              <div key={point.id} className={styles.inputRow}>
                <input
                  className={styles.directInputName}
                  placeholder={idx === 0 ? '나' : `인원 ${idx + 1}`}
                  value={point.name}
                  maxLength={6}
                  onChange={(e) => updatePoint(point.id, 'name', e.target.value)}
                />
                <input
                  className={styles.directInputAddr}
                  placeholder="출발지 입력 (예: 서울 마포구)"
                  value={point.address}
                  readOnly
                  onClick={() => setAddressSheetTargetId(point.id)}
                />
                {points.length > 2 && (
                  <button className={styles.removeButton} onClick={() => removeRow(point.id)}>
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {points.length < 10 && (
            <button className={styles.outlineButton} style={{ marginTop: 4 }} onClick={addRow}>
              ＋ 모임 인원 추가하기
            </button>
          )}
          <p className={styles.caption} style={{ marginTop: 10 }}>
            {points.length < 10 ? `최대 10명까지 입력할 수 있어요` : '최대 인원에 도달했어요'}
          </p>

          <button className={styles.textButton} onClick={() => navigate('/place/share')}>
            친구들에게 물어볼까요?
          </button>
        </div>
      </PageLayout>
      {addressSheetTargetId !== null && (
        <AddressSearchSheet
          onSelect={(address) => updatePoint(addressSheetTargetId, 'address', address)}
          onClose={() => setAddressSheetTargetId(null)}
        />
      )}
    </>
  );
};
