import { getAuthToken } from '@/utils/isLogin';

import { API_MODE, BASE_URL } from './config';

/** 상태 코드별로 다른 안내를 보여줘야 하는 화면이 있어 status를 error에 실어 보낸다. */
export class ApiError extends Error {
  status: number;
  /** FastAPI 검증 오류(422)에서 문제가 된 필드 이름. 화면별로 안내 문구를 고를 때 쓴다 */
  invalidFields: string[];

  constructor(status: number, message: string, invalidFields: string[] = []) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.invalidFields = invalidFields;
  }
}

type FastApiValidationItem = { loc?: (string | number)[]; msg?: string };

/** FastAPI 검증 오류의 loc(["body", "date"])에서 위치 접두어를 빼고 필드 이름만 뽑는다 */
const getInvalidFields = (detail: unknown): string[] => {
  if (!Array.isArray(detail)) return [];
  const fields = (detail as FastApiValidationItem[])
    .map((item) => item.loc?.filter((key) => !['body', 'query', 'path'].includes(String(key))))
    .filter((loc): loc is (string | number)[] => !!loc && loc.length > 0)
    .map((loc) => loc.join('.'));
  return [...new Set(fields)];
};

/**
 * 사내 백엔드는 message, FastAPI는 detail로 사유를 내려준다.
 * FastAPI 422는 detail이 배열이라 그대로 보여줄 수 없으므로 문제 필드만 담아 안내한다.
 * 서버 내부 메시지(영문 검증 문구 등)는 화면에 그대로 노출하지 않는다.
 */
const getErrorMessage = (body: unknown, invalidFields: string[]) => {
  const { message, detail } = (body ?? {}) as { message?: unknown; detail?: unknown };
  if (typeof message === 'string' && message) return message;
  if (typeof detail === 'string' && detail) return detail;
  if (invalidFields.length > 0) return `입력값이 올바르지 않아요 (${invalidFields.join(', ')})`;
  return '요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.';
};

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
      // 회원 토큰이 우선이고, 초대 링크로 들어온 비회원은 게스트 토큰으로 호출한다
      const token = getAuthToken();
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${options?.baseUrl ?? BASE_URL}${url}`, {
      method: options?.method ?? 'GET',
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const invalidFields = getInvalidFields(body?.detail);
      throw new ApiError(res.status, getErrorMessage(body, invalidFields), invalidFields);
    }

    return res.json();
  }

  throw new Error('Mock mode requires mock handler');
};
