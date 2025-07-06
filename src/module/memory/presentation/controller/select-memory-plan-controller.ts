import { SessionDTO } from "../../../auth";
import { Controller, HttpResponse, ok } from "../../../common";
import {
  SelectMemoryPlanUseCase,
  Input,
} from "../../application/use-case/select-memory-plan-use-case";

export class SelectMemoryPlanController implements Controller {
  constructor(
    private readonly selectMemoryPlanUseCase: SelectMemoryPlanUseCase
  ) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.selectMemoryPlanUseCase.execute({
      ...params,
      userId: params.session.user.id,
    });
    return ok(data);
  }
}

type Params = Input & {
  session: SessionDTO;
};
