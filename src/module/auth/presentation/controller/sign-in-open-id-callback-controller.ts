import { Controller, HttpResponse, ok } from "../../../common";
import { SignInOpenIdCallbackUseCase } from "../../application/use-case/sign-in-open-id-callback-use-case";

export class SignInOpenIdCallbackController implements Controller {
  constructor(
    private readonly signInOpenIdCallbackUseCase: SignInOpenIdCallbackUseCase
  ) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.signInOpenIdCallbackUseCase.execute(params);
    return ok(data);
  }
}
