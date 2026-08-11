import { LOCAL_STORAGE } from '@/utils/isLogin';

import { API_MODE, BASE_URL } from './config';

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
      throw new Error(body?.message || 'API Error');
    }

    return res.json();
  }

  throw new Error('Mock mode requires mock handler');
};
