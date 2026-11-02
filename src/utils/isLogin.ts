export const LOCAL_STORAGE = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  GUEST_TOKEN: 'guestToken',
  GUEST_UUID: 'guestUuid',
  GUEST_USERNAME: 'guestUsername',
};

/** 게스트 토큰은 회원 전용 화면(PrivateRoute)을 열면 안 되므로 accessToken과 키를 분리한다 */
export const isLogin = () => localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);

/**
 * 만료 여부만 보려고 payload를 읽는다. 서명 검증은 서버 몫이라 여기서 판단하는 값은 신뢰하지 않는다.
 * 형식이 깨졌으면 만료된 것으로 보고 재발급받게 한다.
 */
const isTokenExpired = (token: string) => {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(payload)) as { exp?: number };
    return !exp || exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

export const getStoredGuestToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE.GUEST_TOKEN);
  if (!token) return null;
  if (isTokenExpired(token)) {
    clearGuestToken();
    return null;
  }
  return token;
};

export const getStoredGuestUuid = () => localStorage.getItem(LOCAL_STORAGE.GUEST_UUID);

export const saveGuestToken = (guestToken: string, uuId: string) => {
  localStorage.setItem(LOCAL_STORAGE.GUEST_TOKEN, guestToken);
  localStorage.setItem(LOCAL_STORAGE.GUEST_UUID, uuId);
};

export const clearGuestToken = () => {
  localStorage.removeItem(LOCAL_STORAGE.GUEST_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE.GUEST_UUID);
  // 토큰이 만료되면 새 게스트(uuId)가 되므로 username도 새로 받는다
  localStorage.removeItem(LOCAL_STORAGE.GUEST_USERNAME);
};

export const getStoredGuestUsername = () => localStorage.getItem(LOCAL_STORAGE.GUEST_USERNAME);

export const saveGuestUsername = (username: string) => {
  localStorage.setItem(LOCAL_STORAGE.GUEST_USERNAME, username);
};

export const getAuthToken = () => isLogin() ?? getStoredGuestToken();
