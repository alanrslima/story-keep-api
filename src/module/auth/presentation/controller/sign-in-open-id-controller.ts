import { Controller, HttpResponse, ok } from "../../../common";
import { SignInOpenIdUseCase } from "../../application/use-case/sign-in-open-id-use-case";

export class SignInOpenIdController implements Controller {
  constructor(private readonly signInOpenIdUseCase: SignInOpenIdUseCase) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.signInOpenIdUseCase.execute(params);
    return ok(data);
  }
}
