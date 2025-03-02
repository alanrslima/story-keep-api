import { HttpResponse } from './http-response';

export interface Controller<T = any, R = any> {
  handle: (params: T) => Promise<HttpResponse<R>>;
}
