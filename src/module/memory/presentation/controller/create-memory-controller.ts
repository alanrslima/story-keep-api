import { SessionDTO } from "../../../auth";
import { Controller, created, HttpResponse } from "../../../common";
import {
  CreateMemoryUseCase,
  Input,
} from "../../application/use-case/create-memory-use-case";

export class CreateMemoryController implements Controller {
  constructor(private readonly createMemoryUseCase: CreateMemoryUseCase) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.createMemoryUseCase.execute({
      ...params,
      userId: params.session.user.id,
    });
    return created(data);
  }
}

type Params = Input & {
  session: SessionDTO;
};
