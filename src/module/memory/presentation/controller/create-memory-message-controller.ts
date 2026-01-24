import { SessionDTO } from "../../../auth";
import { Controller, created, HttpResponse } from "../../../common";
import {
  CreateMemoryMessageUseCase,
  Input,
} from "../../application/use-case/message/create-memory-message-use-case";

export class CreateMemoryMessageController implements Controller {
  constructor(
    private readonly createMemoryMessageUseCase: CreateMemoryMessageUseCase,
  ) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.createMemoryMessageUseCase.execute({
      ...params,
      userId: params.session.user.id,
    });
    return created(data);
  }
}

type Params = Omit<Input, "userId"> & {
  session: SessionDTO;
};
