const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8080/api/v1';

interface RequestOptions extends RequestInit {
  token?: string;
  idempotencyKey?: string;
}

async function apiFetch<T>(path: string, { token, idempotencyKey, headers, ...init }: RequestOptions = {}): Promise<T> {
  const mergedHeaders = new Headers(headers || {});
  mergedHeaders.set('Content-Type', 'application/json');
  if (token) {
    mergedHeaders.set('Authorization', `Bearer ${token}`);
  }
  if (idempotencyKey) {
    mergedHeaders.set('Idempotency-Key', idempotencyKey);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: mergedHeaders,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export function uuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

export const api = {
  auth: {
    register: (email: string, password: string) =>
      apiFetch<{ token: string; user: unknown }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    login: (email: string, password: string) =>
      apiFetch<{ token: string; user: unknown }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    me: (token: string) => apiFetch<{ user: unknown }>('/auth/me', { token }),
  },
  tickets: {
    award: (token: string, amount: number, source: string, metadata?: Record<string, any>) =>
      apiFetch('/tickets/earn', {
        method: 'POST',
        token,
        idempotencyKey: uuid(),
        body: JSON.stringify({ amount, source, metadata }),
      }),
    buy: (token: string, cost: number, source: string, metadata?: Record<string, any>) =>
      apiFetch('/tickets/buy', {
        method: 'POST',
        token,
        idempotencyKey: uuid(),
        body: JSON.stringify({ cost, source, metadata }),
      }),
  },
  xp: {
    award: (token: string, delta: number, reason: string, source: string, metadata?: Record<string, any>) =>
      apiFetch('/xp/award', {
        method: 'POST',
        token,
        idempotencyKey: uuid(),
        body: JSON.stringify({ delta, reason, source, metadata }),
      }),
  },
  missions: {
    addProgress: (token: string, missionCode: string, delta: number, eventId: string, metadata?: Record<string, any>) =>
      apiFetch('/missions/progress', {
        method: 'POST',
        token,
        idempotencyKey: uuid(),
        body: JSON.stringify({ mission_code: missionCode, delta, event_id: eventId, metadata }),
      }),
    refresh: (token: string) =>
      apiFetch('/missions/refresh', {
        method: 'POST',
        token,
        idempotencyKey: uuid(),
      }),
    list: (token: string) => apiFetch<{ missions: unknown }>('/missions', { token }),
  },
  leaderboard: {
    global: (token: string, limit = 50) => apiFetch<{ leaderboard: unknown[] }>(`/leaderboard/global?limit=${limit}`, { token }),
  },
};

export type ApiClient = typeof api;
export const API_BASE_URL = API_BASE;
