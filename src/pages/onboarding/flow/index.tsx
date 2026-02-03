import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/ui/button/button';

import * as styles from './page.css';

const FLOWS = [
  {
    title: '홈',
    description:
      '지도에서 모임 장소를 선택하고 공유할 수 있어요.\n\n 모임에 참여하는 날, 모임 참여자들이 모임 장소까지 도달하는데 걸리는 시간을 알 수 있어요.',
    emoji: '🏠',
  },
  {
    title: '캘린더',
    description: '다가오는 모임 일정과\n지난 모임 일정을 확인할 수 있어요.',
    emoji: '📅',
  },
  {
    title: '톡',
    description: '모임을 위한 대화를 나누는 공간이에요.',
    emoji: '💬',
  },
  {
    title: '갤러리',
    description: '채팅방에서 공유된 사진을 확인할 수 있어요.',
    emoji: '🖼️',
  },
  {
    title: '마이페이지',
    description: '계정 정보와 알림 설정, 모임 주최를 할 수 있어요.',
    emoji: '👤',
  },
];

export const FlowPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const isLast = step === FLOWS.length - 1;

  const current = FLOWS[step];

  const goNext = () => {
    if (isLast) {
      navigate('/home');
    } else {
      setStep(step + 1);
    }
  };

  const skip = () => {
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Icon */}
        <div className={styles.icon}>{current.emoji}</div>

        {/* Text */}
        <h1 className={styles.title}>{current.title}</h1>
        <p className={styles.description}>{current.description}</p>
      </div>
      {/* Footer */}
      <div className={styles.footer}>
        {/* Indicator */}
        <div className={styles.indicator}>
          {FLOWS.map((_, i) => (
            <span key={i} className={`${styles.dot} ${i === step ? styles.activeDot : ''}`} />
          ))}
        </div>
        <Button size="l" onClick={goNext}>
          {isLast ? '시작하기' : '다음'}
        </Button>
        {/* Skip */}
        {!isLast && (
          <Button size="l" color="white" onClick={skip}>
            건너뛰기
          </Button>
        )}
      </div>
    </div>
  );
};
