import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { Button } from '@/ui/button/button';
import { PageLayout } from '@/ui/layout/page-layout';

import * as styles from './page.css';

const ShareIllust = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <rect width="200" height="200" rx="8" fill="#EFF6FF" />
    {/* Partiful-style invite card */}
    <rect x="28" y="14" width="144" height="126" rx="14" fill="white" />
    {/* Card header */}
    <rect x="28" y="14" width="144" height="70" rx="14" fill="#1D4ED8" />
    <rect x="28" y="70" width="144" height="14" fill="#1D4ED8" />
    {/* Grid lines in header */}
    <line x1="28" y1="38" x2="172" y2="38" stroke="white" strokeWidth="0.7" opacity="0.18" />
    <line x1="28" y1="58" x2="172" y2="58" stroke="white" strokeWidth="0.7" opacity="0.18" />
    <line x1="68" y1="14" x2="68" y2="84" stroke="white" strokeWidth="0.7" opacity="0.18" />
    <line x1="108" y1="14" x2="108" y2="84" stroke="white" strokeWidth="0.7" opacity="0.18" />
    <line x1="148" y1="14" x2="148" y2="84" stroke="white" strokeWidth="0.7" opacity="0.18" />
    {/* Map pin in header */}
    <ellipse cx="100" cy="79" rx="7" ry="2.5" fill="rgba(0,0,0,0.2)" />
    <path d="M100 30C93 30 87 36 87 44C87 55 100 67 100 67C100 67 113 55 113 44C113 36 107 30 100 30Z" fill="white" />
    <circle cx="100" cy="44" r="5" fill="#3B82F6" />
    {/* Card body */}
    <text x="100" y="104" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="800">어디서 만날까요?</text>
    <text x="100" y="119" textAnchor="middle" fill="#6B7280" fontSize="9">위밋톡 중간위치 찾기</text>
    <text x="100" y="132" textAnchor="middle" fill="#3B82F6" fontSize="8">wemeettalk.com/meet/···</text>
    {/* "링크 공유!" chat bubble (right) */}
    <rect x="106" y="150" width="80" height="22" rx="11" fill="#3B82F6" />
    <text x="146" y="165" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="600">링크 공유했어! 🔗</text>
    {/* Response bubbles (left) */}
    <rect x="14" y="150" width="80" height="22" rx="11" fill="white" />
    <text x="54" y="165" textAnchor="middle" fill="#374151" fontSize="8.5">마포구 입력 ✓</text>
    <rect x="14" y="178" width="80" height="18" rx="9" fill="white" />
    <text x="54" y="191" textAnchor="middle" fill="#374151" fontSize="8">수원시 입력 ✓</text>
  </svg>
);

const MidpointIllust = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <rect width="200" height="200" rx="8" fill="#EFF6FF" />
    {/* Map card */}
    <rect x="16" y="16" width="168" height="168" rx="12" fill="white" stroke="#BFDBFE" strokeWidth="1.5" />
    {/* Grid lines */}
    <line x1="16" y1="58" x2="184" y2="58" stroke="#EFF6FF" strokeWidth="1.5" />
    <line x1="16" y1="100" x2="184" y2="100" stroke="#EFF6FF" strokeWidth="1.5" />
    <line x1="16" y1="142" x2="184" y2="142" stroke="#EFF6FF" strokeWidth="1.5" />
    <line x1="58" y1="16" x2="58" y2="184" stroke="#EFF6FF" strokeWidth="1.5" />
    <line x1="100" y1="16" x2="100" y2="184" stroke="#EFF6FF" strokeWidth="1.5" />
    <line x1="142" y1="16" x2="142" y2="184" stroke="#EFF6FF" strokeWidth="1.5" />
    {/* Pin A - top left */}
    <circle cx="46" cy="56" r="14" fill="#DBEAFE" />
    <circle cx="46" cy="56" r="9" fill="#38BDF8" />
    <text x="46" y="60" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">A</text>
    {/* Pin B - top right */}
    <circle cx="160" cy="42" r="12" fill="#DBEAFE" />
    <circle cx="160" cy="42" r="8" fill="#5AC8B0" />
    <text x="160" y="46" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">B</text>
    {/* Pin C - bottom left */}
    <circle cx="40" cy="158" r="12" fill="#DBEAFE" />
    <circle cx="40" cy="158" r="8" fill="#C08BEF" />
    <text x="40" y="162" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">C</text>
    {/* Dashed lines to center */}
    <line x1="46" y1="56" x2="100" y2="100" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="5 4" />
    <line x1="160" y1="42" x2="100" y2="100" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="5 4" />
    <line x1="40" y1="158" x2="100" y2="100" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="5 4" />
    {/* Center glow */}
    <circle cx="100" cy="100" r="22" fill="#3B82F6" opacity="0.12" />
    <circle cx="100" cy="100" r="14" fill="#3B82F6" opacity="0.18" />
    {/* Center pin */}
    <ellipse cx="100" cy="116" rx="8" ry="3" fill="rgba(59,130,246,0.28)" />
    <path d="M100 78C91 78 84 85 84 95C84 108 100 120 100 120C100 120 116 108 116 95C116 85 109 78 100 78Z" fill="#3B82F6" />
    <circle cx="100" cy="95" r="6" fill="white" />
    {/* Label */}
    <rect x="62" y="154" width="76" height="18" rx="9" fill="#EFF6FF" />
    <text x="100" y="167" textAnchor="middle" fill="#1D4ED8" fontSize="9" fontWeight="700">중간위치 강남역</text>
  </svg>
);

const RecommendIllust = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <rect width="200" height="200" rx="8" fill="#EFF6FF" />
    {/* AI icon */}
    <circle cx="100" cy="26" r="16" fill="#3B82F6" opacity="0.15" />
    <circle cx="100" cy="26" r="11" fill="#3B82F6" opacity="0.22" />
    <circle cx="100" cy="26" r="7" fill="#3B82F6" />
    <path d="M96 26l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    {/* Category chips */}
    <rect x="20" y="50" width="48" height="18" rx="9" fill="#3B82F6" />
    <text x="44" y="63" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">맛집</text>
    <rect x="74" y="50" width="48" height="18" rx="9" fill="#DBEAFE" />
    <text x="98" y="63" textAnchor="middle" fill="#3B82F6" fontSize="9" fontWeight="600">카페</text>
    <rect x="128" y="50" width="52" height="18" rx="9" fill="#DBEAFE" />
    <text x="154" y="63" textAnchor="middle" fill="#3B82F6" fontSize="9" fontWeight="600">문화생활</text>
    {/* Place card 1 */}
    <rect x="16" y="76" width="168" height="36" rx="10" fill="white" stroke="#BFDBFE" strokeWidth="1.5" />
    <text x="28" y="92" fill="#111827" fontSize="10" fontWeight="700">강남역 분위기 좋은 곳</text>
    <text x="28" y="105" fill="#6B7280" fontSize="8.5">강남구 · 도보 5분</text>
    <rect x="140" y="82" width="36" height="14" rx="7" fill="#EFF6FF" />
    <text x="158" y="93" textAnchor="middle" fill="#3B82F6" fontSize="7.5" fontWeight="700">AI 추천</text>
    {/* Place card 2 */}
    <rect x="16" y="120" width="168" height="36" rx="10" fill="white" stroke="#BFDBFE" strokeWidth="1.5" />
    <text x="28" y="136" fill="#111827" fontSize="10" fontWeight="700">강남 인기 맛집</text>
    <text x="28" y="149" fill="#6B7280" fontSize="8.5">강남구 · 도보 8분</text>
    <rect x="140" y="126" width="36" height="14" rx="7" fill="#EFF6FF" />
    <text x="158" y="137" textAnchor="middle" fill="#3B82F6" fontSize="7.5" fontWeight="700">AI 추천</text>
    {/* Place card 3 */}
    <rect x="16" y="164" width="168" height="28" rx="10" fill="white" stroke="#EFF6FF" strokeWidth="1.5" />
    <text x="28" y="180" fill="#9CA3AF" fontSize="9.5">강남 카페라운지 외 2곳 ···</text>
  </svg>
);

const FEATURE_CARDS = [
  { Illust: ShareIllust, title: '링크 공유' },
  { Illust: MidpointIllust, title: '중간위치 찾기' },
  { Illust: RecommendIllust, title: 'AI 장소 추천' },
];

export const GuestPlaceEntryPage = () => {
  const navigate = useNavigate();
  const cardBoxRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (cardBoxRef.current?.offsetLeft ?? 0);
    scrollLeft.current = cardBoxRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !cardBoxRef.current) return;
    e.preventDefault();
    const x = e.pageX - (cardBoxRef.current.offsetLeft ?? 0);
    cardBoxRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };

  const onMouseUp = () => { isDragging.current = false; };

  return (
    <PageLayout
      header={
        <AppBar title="모임장소 정하기" showBackButton onBackClick={() => navigate('/')} />
      }
      footer={
        <div className={styles.entryFooter}>
          <Button size="l" color="blue" onClick={() => navigate('/place/share')}>
            출발위치 물어보기
          </Button>
          <Button size="l" color="white" onClick={() => navigate('/place/direct')}>
            출발위치 입력하기
          </Button>
          <span className={styles.caption}>모두의 출발지를 알고 계신가요?</span>
        </div>
      }
      className={styles.entryContent}
    >
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>우리 어디서 만날까요?</h1>
        <p className={styles.heroDesc}>
          모두의 출발지로 중간위치를 찾고<br />만날 장소를 추천해 드려요
        </p>
      </div>

      <div
        ref={cardBoxRef}
        className={styles.featureCardBox}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {FEATURE_CARDS.map(({ Illust, title }) => (
          <div key={title} className={styles.featureCard}>
            <span className={styles.featureCardTitle}>{title}</span>
            <div className={styles.featureCardImage}>
              <Illust />
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};
