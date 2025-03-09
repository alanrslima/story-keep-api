import { Controller, HttpResponse, ok } from "../../../common";
import { SignInOpenIdUseCase } from "../../application/use-case/sign-in-open-id-use-case";

export class SignInOpenIdController implements Controller {
  constructor(private readonly signInOpenIdUseCase: SignInOpenIdUseCase) {}

  async handle(): Promise<HttpResponse<unknown>> {
    const data = await this.signInOpenIdUseCase.execute();
    return ok(data);
  }
}
