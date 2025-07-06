import { SessionDTO } from "../../../auth";
import { Controller, created, HttpResponse } from "../../../common";
import {
  CreateMemoryOrderIntentUseCase,
  Input,
} from "../../application/use-case/create-memory-order-intent-use-case";

export class CreateMemoryOrderIntentController implements Controller {
  constructor(
    private readonly crCreateMemoryOrderIntentUseCaseeate: CreateMemoryOrderIntentUseCase
  ) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.crCreateMemoryOrderIntentUseCaseeate.execute({
      ...params,
      userId: params.session.user.id,
    });
    return created(data);
  }
}

type Params = Input & {
  session: SessionDTO;
};
