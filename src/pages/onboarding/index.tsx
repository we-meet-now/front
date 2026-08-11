import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OnboardingLogo } from '@/assets';
import { Button } from '@/ui/button/button';
import { PageLayout } from '@/ui/layout/page-layout';
import { cx } from '@/ui/utils';

import * as styles from './page.css';

const CalendarIllust = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <rect width="200" height="200" rx="8" fill="#EFF6FF" />
    <rect x="30" y="40" width="140" height="130" rx="12" fill="white" stroke="#BFDBFE" strokeWidth="2" />
    <rect x="30" y="40" width="140" height="36" rx="12" fill="#3B82F6" />
    <rect x="30" y="64" width="140" height="12" fill="#3B82F6" />
    <line x1="60" y1="40" x2="60" y2="32" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
    <line x1="140" y1="40" x2="140" y2="32" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
    <text x="100" y="62" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">8월</text>
    {[55,85,115,145].map((x, i) => (
      <text key={i} x={x} y="96" textAnchor="middle" fill="#93C5FD" fontSize="10" fontWeight="600">
        {['월','화','수','목'][i]}
      </text>
    ))}
    {[[55,112],[85,112],[115,112],[145,112],[55,134],[85,134],[115,134],[145,134]].map(([x,y], i) => (
      <text key={i} x={x} y={y} textAnchor="middle" fill="#374151" fontSize="11">{i + 4}</text>
    ))}
    <circle cx="115" cy="128" r="12" fill="#3B82F6" />
    <path d="M109 128l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="85" cy="106" r="12" fill="#DBEAFE" />
    <path d="M79 106l4 4 8-8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="55" cy="128" r="12" fill="#DBEAFE" />
    <path d="M49 128l4 4 8-8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="38" y="152" width="60" height="8" rx="4" fill="#DBEAFE" />
    <rect x="106" y="152" width="56" height="8" rx="4" fill="#EFF6FF" />
  </svg>
);

const MapIllust = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <rect width="200" height="200" rx="8" fill="#EFF6FF" />
    <rect x="20" y="20" width="160" height="160" rx="12" fill="white" stroke="#BFDBFE" strokeWidth="2" />
    <line x1="20" y1="60" x2="180" y2="60" stroke="#EFF6FF" strokeWidth="1.5" />
    <line x1="20" y1="100" x2="180" y2="100" stroke="#EFF6FF" strokeWidth="1.5" />
    <line x1="20" y1="140" x2="180" y2="140" stroke="#EFF6FF" strokeWidth="1.5" />
    <line x1="60" y1="20" x2="60" y2="180" stroke="#EFF6FF" strokeWidth="1.5" />
    <line x1="100" y1="20" x2="100" y2="180" stroke="#EFF6FF" strokeWidth="1.5" />
    <line x1="140" y1="20" x2="140" y2="180" stroke="#EFF6FF" strokeWidth="1.5" />
    <circle cx="55" cy="75" r="10" fill="#93C5FD" opacity="0.6" />
    <text x="55" y="79" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">A</text>
    <circle cx="148" cy="130" r="10" fill="#93C5FD" opacity="0.6" />
    <text x="148" y="134" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">B</text>
    <circle cx="60" cy="145" r="10" fill="#93C5FD" opacity="0.6" />
    <text x="60" y="149" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">C</text>
    <path d="M55 75 Q100 95 100 100" stroke="#BFDBFE" strokeWidth="1.5" strokeDasharray="4 3" />
    <path d="M148 130 Q120 115 100 100" stroke="#BFDBFE" strokeWidth="1.5" strokeDasharray="4 3" />
    <path d="M60 145 Q80 125 100 100" stroke="#BFDBFE" strokeWidth="1.5" strokeDasharray="4 3" />
    <ellipse cx="100" cy="108" rx="18" ry="6" fill="#3B82F6" opacity="0.15" />
    <path d="M100 58 C91 58 84 65 84 74 C84 86 100 102 100 102 C100 102 116 86 116 74 C116 65 109 58 100 58Z" fill="#3B82F6" />
    <circle cx="100" cy="74" r="6" fill="white" />
  </svg>
);

const SettlementIllust = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <rect width="200" height="200" rx="8" fill="#EFF6FF" />
    <rect x="25" y="50" width="150" height="110" rx="12" fill="white" stroke="#BFDBFE" strokeWidth="2" />
    <rect x="25" y="50" width="150" height="38" rx="12" fill="#3B82F6" />
    <rect x="25" y="76" width="150" height="12" fill="#3B82F6" />
    <text x="100" y="73" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">정산 내역</text>
    <rect x="42" y="102" width="116" height="14" rx="4" fill="#EFF6FF" />
    <text x="50" y="113" fill="#374151" fontSize="9">🍖 삼겹살</text>
    <text x="148" y="113" textAnchor="end" fill="#3B82F6" fontSize="9" fontWeight="700">48,000원</text>
    <rect x="42" y="122" width="116" height="14" rx="4" fill="#EFF6FF" />
    <text x="50" y="133" fill="#374151" fontSize="9">🍺 맥주</text>
    <text x="148" y="133" textAnchor="end" fill="#3B82F6" fontSize="9" fontWeight="700">24,000원</text>
    <line x1="42" y1="146" x2="158" y2="146" stroke="#E5E7EB" strokeWidth="1" />
    <text x="50" y="158" fill="#374151" fontSize="9" fontWeight="700">1인당</text>
    <text x="148" y="158" textAnchor="end" fill="#3B82F6" fontSize="11" fontWeight="700">12,000원</text>
    <rect x="55" y="168" width="90" height="22" rx="11" fill="#3B82F6" />
    <text x="100" y="183" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">송금하기</text>
  </svg>
);

const AiManagerIllust = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <rect width="200" height="200" rx="8" fill="#EFF6FF" />
    <circle cx="100" cy="80" r="38" fill="#3B82F6" opacity="0.15" />
    <circle cx="100" cy="80" r="28" fill="#3B82F6" opacity="0.25" />
    <circle cx="100" cy="80" r="20" fill="#3B82F6" />
    <path d="M91 80l6 6 12-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="30" y="128" width="62" height="34" rx="10" fill="white" stroke="#BFDBFE" strokeWidth="1.5" />
    <rect x="108" y="118" width="62" height="34" rx="10" fill="#3B82F6" />
    <text x="61" y="148" textAnchor="middle" fill="#3B82F6" fontSize="9" fontWeight="600">일정 확인해요!</text>
    <text x="139" y="133" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">강남역</text>
    <text x="139" y="145" textAnchor="middle" fill="#DBEAFE" fontSize="8">어때요? 😊</text>
    <path d="M92 118 L100 108" stroke="#BFDBFE" strokeWidth="1.5" />
    <path d="M108 128 L100 108" stroke="#3B82F6" strokeWidth="1.5" />
  </svg>
);

const CARDS = [
  { Illust: AiManagerIllust, title: 'AI 매니저' },
  { Illust: CalendarIllust,  title: '모임 일정 조율 캘린더' },
  { Illust: MapIllust,       title: 'AI 모임장소 추천' },
  { Illust: SettlementIllust, title: '빠른 정산' },
];

export const OnBoardingPage = () => {
  const navigate = useNavigate();
  const cardBoxRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const rafId = useRef<number | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateCardVisuals = () => {
    const box = cardBoxRef.current;
    if (!box) return;
    const boxRect = box.getBoundingClientRect();
    const boxCenter = boxRect.left + boxRect.width / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(box.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(boxCenter - cardCenter);
      const progress = Math.min(distance / boxRect.width, 1);

      card.style.transform = `scale(${1 - progress * 0.12})`;
      card.style.opacity = `${1 - progress * 0.55}`;

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const onScroll = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(updateCardVisuals);
  };

  useEffect(() => {
    updateCardVisuals();
    window.addEventListener('resize', updateCardVisuals);
    return () => {
      window.removeEventListener('resize', updateCardVisuals);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToCard = (index: number) => {
    const card = cardBoxRef.current?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (cardBoxRef.current?.offsetLeft ?? 0);
    scrollLeft.current = cardBoxRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !cardBoxRef.current) return;
    e.preventDefault();
    const x = e.pageX - (cardBoxRef.current.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.2;
    cardBoxRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => { isDragging.current = false; };

  return (
    <PageLayout className={styles.onboarding}>
      <div className={styles.logo}>
        <OnboardingLogo />
      </div>

      <div className={styles.title}>위밋톡</div>
      <div className={styles.subtitle}>모임을 위한 채팅앱</div>



      <div
        ref={cardBoxRef}
        className={styles.cardBox}
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {CARDS.map(({ Illust, title }) => (
          <div key={title} className={styles.card}>
            <span className={styles.cardTitle}>{title}</span>
            <div className={styles.cardImage}>
              <Illust />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dotRow}>
        {CARDS.map(({ title }, index) => (
          <button
            key={title}
            type="button"
            aria-label={`${title} 카드로 이동`}
            className={cx(styles.dot, index === activeIndex && styles.dotActive)}
            onClick={() => scrollToCard(index)}
          />
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <Button size="l" color="blue" onClick={() => navigate('/onboarding/start')}>
          위밋톡 시작하기
        </Button>
        <Button size="l" color="white" onClick={() => navigate('/register')}>
          위밋톡 가입하기
        </Button>
        <button className={styles.guestButton} onClick={() => navigate('/place')}>
          모임장소 추천받기
        </button>
        <span className={styles.guestCaption}>회원가입 없이 바로 써볼 수 있어요</span>
      </div>
    </PageLayout>
  );
};
