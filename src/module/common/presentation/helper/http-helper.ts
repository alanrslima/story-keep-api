import { HttpResponse } from '../contract/http-response';

export const ok = <T>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  body: data,
});

export const created = (data: unknown): HttpResponse<unknown> => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): HttpResponse<unknown> => ({
  statusCode: 204,
  body: null,
});
