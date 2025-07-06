import { SessionDTO } from "../../../auth";
import { Controller, created, HttpResponse } from "../../../common";
import { InitMemoryUseCase } from "../../application/use-case/init-memory-use-case";

export class InitMemoryController implements Controller {
  constructor(private readonly initMemoryUseCase: InitMemoryUseCase) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.initMemoryUseCase.execute({
      userId: params.session.user.id,
    });
    return created(data);
  }
}

type Params = {
  session: SessionDTO;
};
