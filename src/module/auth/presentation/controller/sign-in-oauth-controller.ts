import { Controller, HttpResponse, ok } from "../../../common";
import { SignInOAuthUseCase } from "../../application/use-case/sign-in-oauth-use-case";

export class SignInOAuthController implements Controller {
  constructor(private readonly signInOAuthUseCase: SignInOAuthUseCase) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.signInOAuthUseCase.execute(params);
    return ok(data);
  }
}
