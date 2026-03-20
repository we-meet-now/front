import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CalendarPage } from './pages/calendar';
import { ChatPage } from './pages/chat';
import { AiManagerPage } from './pages/chat/ai';
import { ChatCalendarPage } from './pages/chat/calendar';
import { PollPage } from './pages/chat/poll';
import { ChatRoomPage } from './pages/chat/room';
import { SettlementPage } from './pages/chat/settlement';
import { SettlementNewPage } from './pages/chat/settlement/new';
import { CreateMeetingPage } from './pages/create-meeting';
import { GalleryPage } from './pages/gallery';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { MeetingCompletePage } from './pages/meeting-complete';
import { MeetingLayout } from './pages/meeting-layout';
import { MyPage } from './pages/mypage';
import { MyPageDetail } from './pages/mypage/detail';
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
          <Route path="gallery" element={<GalleryPage />} />
        </Route>

        {/* 채팅 라우팅 */}
        <Route path="chat" element={<ChatPage />} />
        <Route path="room/:roomId/chat" element={<ChatRoomPage />} />
        <Route path="room/:roomId/ai" element={<AiManagerPage />} />
        <Route path="room/:roomId/calendar" element={<ChatCalendarPage />} />
        <Route path="room/:roomId/poll" element={<PollPage />} />
        <Route path="room/:roomId/settlement" element={<SettlementPage />} />
        <Route path="room/:roomId/settlement/new" element={<SettlementNewPage />} />

        {/* 마이페이지 */}
        <Route path="mypage" element={<MyPage />} />
        <Route path="mypage/detail" element={<MyPageDetail />} />
      </Routes>
    </BrowserRouter>
  );
};
