// src/pages/create-meeting/index.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';

import { PlaceStep } from './steps/Place-Step';
import { TimeStep } from './steps/TimeStep';
import { TypeStep } from './steps/TypeStep';
import type { CreateMeetingForm, FunnelStep } from './types';
import { useFunnel } from './useFunnel';

export const CreateMeetingPage = () => {
  const funnel = useFunnel<FunnelStep>(['time', 'type', 'place']);

  const [form, setForm] = useState<CreateMeetingForm>({});

  const updateForm = (partial: Partial<CreateMeetingForm>) => {
    setForm((prev) => ({ ...prev, ...partial }));
  };

  const handleSubmit = () => {
    console.log('최종 제출 데이터:', form);

    // TODO: API 호출
    const roomId = 'abc123';
    navigate(`/meeting-complete/${roomId}`);
  };

  const navigate = useNavigate();

  return (
    <PageLayout
      header={<AppBar title="모임 만들기" showBackButton onBackClick={() => navigate(-1)} />}
    >
      {funnel.step === 'time' && (
        <TimeStep value={form} onChange={updateForm} onNext={funnel.goNext} />
      )}

      {funnel.step === 'type' && (
        <TypeStep
          value={form}
          onChange={updateForm}
          onNext={funnel.goNext}
          onPrev={funnel.goPrev}
        />
      )}

      {funnel.step === 'place' && (
        <PlaceStep
          value={form}
          onChange={updateForm}
          onPrev={funnel.goPrev}
          onSubmit={handleSubmit}
        />
      )}
    </PageLayout>
  );
};
