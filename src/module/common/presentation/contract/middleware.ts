import { HttpResponse } from './http-response';

export interface Middleware<T = any, P = any> {
  handle: (httpRequest: T) => Promise<HttpResponse<P>>;
}
