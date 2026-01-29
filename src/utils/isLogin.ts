const LOCAL_STORAGE = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

export const isLogin = () => localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
