// src/pages/create-meeting/useFunnel.ts
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

/** 다음 단계로 넘어올 때 출발한 단계를 history state에 남겨, 이전 버튼이 히스토리를 되돌릴 수 있는지 판단한다 */
type FunnelLocationState = { funnelFrom?: string } | null;

/**
 * 단계형 UI 훅. 현재 단계를 URL 쿼리(?step=type)로 관리해
 * 브라우저/기기 뒤로가기로도 바로 이전 단계로 돌아갈 수 있게 한다.
 */
export const useFunnel = <T extends string>(steps: readonly T[], queryKey = 'step') => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawStep = searchParams.get(queryKey);

  // 입력값은 페이지 state라 새로고침·직접 진입 시 사라진다.
  // 중간 단계로 바로 들어오면 앞 단계 입력 없이 진행되므로 첫 단계부터 다시 시작한다
  const [needsReset, setNeedsReset] = useState(() => rawStep !== null && rawStep !== steps[0]);

  const writeStep = (target: T, options: { replace?: boolean; state?: FunnelLocationState }) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      // 첫 단계는 쿼리 없이 둔다
      if (target === steps[0]) next.delete(queryKey);
      else next.set(queryKey, target);
      return next;
    }, options);
  };

  useEffect(() => {
    if (!needsReset) return;
    writeStep(steps[0], { replace: true });
    setNeedsReset(false);
    // 마운트 시 한 번만 정리한다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 주소창에서 바꿀 수 있는 값이므로 목록에 없는 단계면 첫 단계로 본다
  const parsedStep = steps.find((s) => s === rawStep) ?? steps[0];
  const step = needsReset ? steps[0] : parsedStep;
  const currentIndex = steps.indexOf(step);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === steps.length - 1;

  const goNext = () => {
    if (isLast) return;
    writeStep(steps[currentIndex + 1], { state: { funnelFrom: step } });
  };

  const goPrev = () => {
    if (isFirst) return;
    const prevStep = steps[currentIndex - 1];
    // 바로 앞 단계에서 넘어온 기록이면 히스토리를 되돌려 뒤로가기와 같은 결과를 만들고,
    // 아니면(직접 진입 등) 되돌릴 기록이 없으므로 현재 기록을 앞 단계로 교체한다
    if ((location.state as FunnelLocationState)?.funnelFrom === prevStep) {
      navigate(-1);
    } else {
      writeStep(prevStep, { replace: true });
    }
  };

  const goTo = (target: T) => {
    if (steps.includes(target) && target !== step) {
      writeStep(target, { state: { funnelFrom: step } });
    }
  };

  return {
    step,
    isFirst,
    isLast,
    goNext,
    goPrev,
    goTo,
  };
};
