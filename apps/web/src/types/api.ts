export interface Client<T> {
  json: () => Promise<T>,
  ok: boolean,
  status: number
};
