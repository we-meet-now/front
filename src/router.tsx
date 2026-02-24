import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CalendarPage } from './pages/calendar';
import { ChatPage } from './pages/chat';
import { CreateMeetingPage } from './pages/create-meeting';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { MeetingCompletePage } from './pages/meeting-complete';
import { MeetingLayout } from './pages/meeting-layout';
import { NotificationPage } from './pages/notification';
import { OnBoardingPage } from './pages/onboarding';
import { CompletePage } from './pages/onboarding/complete';
import { FlowPage } from './pages/onboarding/flow';
import { MeetingPage } from './pages/onboarding/meeting';
import { StartPage } from './pages/onboarding/start';
import { RegisterPage } from './pages/register';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnBoardingPage />} />
        {/* 공통 페이지 */}
        <Route path="onboarding">
          <Route index element={<OnBoardingPage />} />{' '}
          <Route path="start" element={<StartPage />} />{' '}
          <Route path="meeting" element={<MeetingPage />} />{' '}
          <Route path="complete" element={<CompletePage />} />{' '}
          <Route path="flow" element={<FlowPage />} />{' '}
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="create-meeting" element={<CreateMeetingPage />} />

        <Route path="meeting-complete/:roomId" element={<MeetingCompletePage />} />

        {/* 모임방 전용 라우팅 */}
        <Route path="meeting/:roomId" element={<MeetingLayout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="notification" element={<NotificationPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="calendar" element={<CalendarPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
