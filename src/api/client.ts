import { LOCAL_STORAGE } from '@/utils/isLogin';

import { API_MODE, BASE_URL } from './config';

/** 상태 코드별로 다른 안내를 보여줘야 하는 화면이 있어 status를 error에 실어 보낸다. */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST';
  body?: unknown;
  baseUrl?: string;
  auth?: boolean;
};

export const apiClient = async <T>(url: string, options?: RequestOptions): Promise<T> => {
  if (API_MODE === 'server') {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options?.auth) {
      const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
      if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
    }

    const res = await fetch(`${options?.baseUrl ?? BASE_URL}${url}`, {
      method: options?.method ?? 'GET',
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      // FastAPI는 detail, 사내 백엔드는 message로 사유를 내려준다
      const message =
        body?.message ?? (typeof body?.detail === 'string' ? body.detail : null) ?? 'API Error';
      throw new ApiError(res.status, message);
    }

    return res.json();
  }

  throw new Error('Mock mode requires mock handler');
};
