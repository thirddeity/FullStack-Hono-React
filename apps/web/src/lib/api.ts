import { hc } from 'hono/client';
import type { AppType } from '../../../api/src/index';
import type { Client } from '@/types/api';

export const api = hc<AppType>('http://localhost:3000').api;

export const Rest = async <T>(request: Promise<Client<T>>): Promise<T> => {
  const res = await request;
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw { status: res.status, ...errorData };
  }
  return await res.json() as T;
};