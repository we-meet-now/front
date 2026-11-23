import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { isLogin } from '@/utils/isLogin';

/**
 * 회원 전용 화면. 비로그인이면 로그인으로 보내고, 로그인 후 원래 보던 화면으로 돌아온다.
 * redirect 값은 LoginPage에서 getSafeRedirect로 내부 경로만 허용한다.
 */
export default function PrivateRoute() {
  const location = useLocation();

  if (isLogin()) return <Outlet />;

  const redirect = `${location.pathname}${location.search}`;
  return <Navigate replace to={`/login?redirect=${encodeURIComponent(redirect)}`} />;
}
