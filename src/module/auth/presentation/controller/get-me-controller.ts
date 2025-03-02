import { Controller, HttpResponse, ok } from '../../../common';

export class GetMeController implements Controller {
  async handle(params: any): Promise<HttpResponse<unknown>> {
    return ok(params.session);
  }
}
