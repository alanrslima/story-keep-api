import { Controller, HttpResponse, ok } from '../../../common';
import { SignInEmailPasswordUseCase } from '../../application/use-case/sign-in-email-password-use-case';

export class SignInEmailPasswordController implements Controller {
  constructor(
    private readonly signInEmailPasswordUseCase: SignInEmailPasswordUseCase,
  ) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.signInEmailPasswordUseCase.execute(params);
    return ok(data);
  }
}
