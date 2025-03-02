import { Controller, created, HttpResponse } from '../../../common';
import { SignUpUseCase } from '../../application/use-case/sign-up-use-case';

export class SignUpController implements Controller {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.signUpUseCase.execute(params);
    return created(data);
  }
}
