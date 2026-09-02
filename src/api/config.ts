export const API_MODE: 'server' | 'local' = 'server';

/**
 * Vite는 빌드 시점에 import.meta.env를 인라인하므로,
 * 배포 환경에 변수가 등록되지 않으면 값이 undefined가 된 채로 번들에 박힌다.
 * 이 경우 fetch/SockJS가 현재 페이지 URL로 상대 해석되어 엉뚱한 요청이 나가므로,
 * 조용히 넘어가지 않고 명시적으로 경고를 남긴다.
 */
const readEnv = (key: string, value: string | undefined): string => {
  if (!value) {
    console.error(
      `[config] 환경변수 ${key}가 비어 있습니다. 배포 환경(Vercel)의 Environment Variables에 등록 후 재배포하세요.`,
    );
    return '';
  }
  return value;
};

// AI API
export const BASE_URL = readEnv('VITE_BASE_URL', import.meta.env.VITE_BASE_URL);

// 인증
export const AUTH_URL = readEnv('VITE_AUTH_URL', import.meta.env.VITE_AUTH_URL);

// 웹소켓 통신
export const WS_URL = readEnv('VITE_WS_URL', import.meta.env.VITE_WS_URL);

// chat API
export const CHAT_URL = readEnv('VITE_CHAT_URL', import.meta.env.VITE_CHAT_URL);

// AI 추천 API
export const AI_URL = readEnv('VITE_AI_URL', import.meta.env.VITE_AI_URL);
