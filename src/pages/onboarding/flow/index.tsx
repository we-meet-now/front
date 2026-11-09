import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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

/** 다음 버튼으로 들어온 단계인지 표시한다. 이 경우 이전 버튼은 히스토리를 되돌린다 */
type FlowLocationState = { fromFlowStep?: number } | null;

/**
 * URL의 step(1부터 시작)을 0부터 시작하는 인덱스로 바꾼다.
 * 주소창에서 직접 바꿀 수 있는 값이므로 숫자가 아니거나 범위를 벗어나면 첫 단계/마지막 단계로 맞춘다.
 */
const parseStep = (value: string | null) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return 0;
  return Math.min(parsed, FLOWS.length) - 1;
};

export const FlowPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // 단계를 URL(?step=2)로 관리해 브라우저/기기 뒤로가기로도 이전 단계로 돌아갈 수 있게 한다
  const step = parseStep(searchParams.get('step'));
  const isFirst = step === 0;
  const isLast = step === FLOWS.length - 1;

  const current = FLOWS[step];

  const goNext = () => {
    if (isLast) {
      navigate('/create-meeting');
    } else {
      const state: FlowLocationState = { fromFlowStep: step };
      setSearchParams({ step: String(step + 2) }, { state });
    }
  };

  const goPrev = () => {
    if (isFirst) return;
    // 바로 앞 단계에서 다음으로 넘어온 경우는 히스토리를 되돌려 뒤로가기와 같은 결과를 만든다.
    // 주소로 바로 들어온 경우는 되돌릴 기록이 없으므로 현재 기록을 앞 단계로 교체한다
    const fromFlowStep = (location.state as FlowLocationState)?.fromFlowStep;
    if (fromFlowStep === step - 1) {
      navigate(-1);
    } else {
      // 앞 단계의 1부터 시작하는 번호는 현재 인덱스(step)와 같다. 첫 단계는 쿼리 없이 둔다
      setSearchParams(step === 1 ? {} : { step: String(step) }, { replace: true });
    }
  };

  const skip = () => {
    navigate('/create-meeting');
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
        <div className={styles.navRow}>
          {/* 첫 단계에는 돌아갈 곳이 없으므로 이전 버튼을 숨긴다 */}
          {!isFirst && (
            <Button size="l" color="grey" onClick={goPrev} className={styles.navButton}>
              이전
            </Button>
          )}
          <Button size="l" onClick={goNext} className={styles.navButton}>
            {isLast ? '시작하기' : '다음'}
          </Button>
        </div>
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
