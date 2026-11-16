// src/pages/create-meeting/index.tsx
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useCreateChatRoomMutation } from '@/api/query/chat';
import { AppBar } from '@/ui/appbar/app-bar';
import { PageLayout } from '@/ui/layout/page-layout';
import { Toast } from '@/ui/toast/toast';
import { isLogin } from '@/utils/isLogin';

import { PlaceStep } from './steps/Place-Step';
import { TimeStep } from './steps/TimeStep';
import { TypeStep } from './steps/TypeStep';
import type { CreateMeetingForm, FunnelStep } from './types';
import { useFunnel } from './useFunnel';

const LOGIN_PATH = `/login?redirect=${encodeURIComponent('/create-meeting')}`;

/**
 * 방 생성은 회원(방장)만 가능하므로 입력을 시작하기 전에 로그인부터 확인한다.
 * 루트·마이페이지·온보딩 등 어디서 들어오든 여기서 걸러지고, 로그인 후 다시 이 화면으로 돌아온다.
 * 히스토리를 교체해 로그인 화면에서 뒤로가기 시 이전 화면(루트 등)으로 돌아가게 한다.
 */
export const CreateMeetingPage = () => {
  if (!isLogin()) return <Navigate replace to={LOGIN_PATH} />;
  return <CreateMeetingFunnel />;
};

const CreateMeetingFunnel = () => {
  const funnel = useFunnel<FunnelStep>(['time', 'type', 'place']);

  const [form, setForm] = useState<CreateMeetingForm>({});

  const updateForm = (partial: Partial<CreateMeetingForm>) => {
    setForm((prev) => ({ ...prev, ...partial }));
  };

  const navigate = useNavigate();
  const createChatRoomMutation = useCreateChatRoomMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (createChatRoomMutation.isPending) return;

    // 입력 중 다른 탭에서 로그아웃하는 등 토큰이 사라진 경우를 대비해 생성 직전에도 확인한다.
    // 게스트 토큰으로 방이 만들어지지 않도록 회원 토큰만 인정한다
    if (!isLogin()) {
      navigate(LOGIN_PATH);
      return;
    }

    createChatRoomMutation.mutate(
      {
        // 모임 이름 입력 단계가 없어 모임 종류를 방 이름으로 쓴다
        chatRoomNm: form.meetingType ?? '새 모임',
        // 참가자는 초대 링크로 들어오므로 생성 시점에는 비워 둔다
        invitedUserIdList: [],
      },
      {
        onSuccess: ({ data: { chatRoomId, enterCode } }) => {
          navigate(`/meeting-complete/${chatRoomId}?code=${encodeURIComponent(enterCode)}`);
        },
        onError: (error) => setErrorMessage(error.message),
      },
    );
  };

  return (
    <PageLayout
      header={
        <AppBar
          title="모임 만들기"
          showBackButton
          // 2단계부터는 페이지를 나가지 않고 바로 이전 단계로 돌아간다
          onBackClick={() => (funnel.isFirst ? navigate(-1) : funnel.goPrev())}
        />
      }
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
          isSubmitting={createChatRoomMutation.isPending}
        />
      )}

      {errorMessage && (
        <Toast
          title="모임을 만들지 못했어요"
          description={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </PageLayout>
  );
};
