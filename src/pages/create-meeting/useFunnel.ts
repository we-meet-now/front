// src/pages/create-meeting/useFunnel.ts
import { useState } from 'react';

export const useFunnel = <T extends string>(steps: readonly T[]) => {
  const [step, setStep] = useState<T>(steps[0]);

  const currentIndex = steps.indexOf(step);

  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const goTo = (target: T) => {
    if (steps.includes(target)) {
      setStep(target);
    }
  };

  return {
    step,
    goNext,
    goPrev,
    goTo,
  };
};
