import { Controller, HttpResponse, ok } from "../../../common";
import { SessionDTO } from "../../application";
import { CompleteFirstLoginUseCase } from "../../application/use-case/complete-first-login-use-case";

export class CompleteFirstLoginController implements Controller {
  constructor(
    private readonly completeFirstLoginUseCase: CompleteFirstLoginUseCase
  ) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.completeFirstLoginUseCase.execute({
      userId: params.session.user.id,
    });
    return ok(data);
  }
}

type Params = {
  session: SessionDTO;
};
