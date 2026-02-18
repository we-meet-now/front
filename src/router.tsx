import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
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
        <Route path="onboarding">
          <Route index element={<OnBoardingPage />} />
          <Route path="start" element={<StartPage />} />
          <Route path="meeting" element={<MeetingPage />} />
          <Route path="complete" element={<CompletePage />} />
          <Route path="flow" element={<FlowPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="notification" element={<NotificationPage />} />
      </Routes>
    </BrowserRouter>
  );
};
