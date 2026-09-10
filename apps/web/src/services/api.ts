// API service layer — all calls go through here
// In Sprint 5 auth tokens will be added automatically via interceptor

const BASE = '/api';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

async function del(path: string): Promise<void> {
  const res = await fetch(`${BASE}${path}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
}

async function uploadFile<T>(path: string, formData: FormData): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { method: 'POST', body: formData });
  if (!res.ok) throw new Error(`UPLOAD ${path} failed: ${res.status}`);
  return res.json();
}

// Demo user ID (will be replaced by auth context in Sprint 5)
export const DEMO_USER_ID = 'afa2c650-7e7f-42b9-8b55-48677d431986';
export const DEMO_PROFILE_ID = '41613029-e347-4cec-80e9-a3e479fb3f62';

export const api = {
  health: () => get<{ status: string }>('/health'),

  profile: {
    get: (userId: string) => get(`/profile/${userId}`),
    facts: (userId: string) => get(`/profile/${userId}/facts`),
    verifyFact: (userId: string, factId: string) => post(`/profile/${userId}/facts/${factId}/verify`),
    seed: () => post('/profile/seed'),
  },

  opportunities: {
    list: () => get('/opportunities'),
    get: (id: string) => get(`/opportunities/${id}`),
    seed: () => post('/opportunities/seed'),
  },

  cvs: {
    list: (userId: string) => get(`/cvs?userId=${userId}`),
    get: (id: string) => get(`/cvs/${id}`),
    create: (body: unknown) => post('/cvs', body),
    duplicate: (id: string) => post(`/cvs/${id}/duplicate`),
    delete: (id: string) => del(`/cvs/${id}`),
  },

  documents: {
    list: (userId: string) => get(`/documents?userId=${userId}`),
    upload: (userId: string, type: string, file: File) => {
      const fd = new FormData();
      fd.append('file', file);
      return uploadFile(`/documents/upload?userId=${userId}&type=${type}`, fd);
    },
    delete: (id: string) => del(`/documents/${id}`),
  },
};
