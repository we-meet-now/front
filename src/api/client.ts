import { API_MODE, BASE_URL } from './config';

type RequestOptions = {
  method?: 'GET' | 'POST';
  body?: unknown;
};

export const apiClient = async <T>(url: string, options?: RequestOptions): Promise<T> => {
  if (API_MODE === 'server') {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: options?.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      throw new Error('API Error');
    }

    return res.json();
  }

  throw new Error('Mock mode requires mock handler');
};
