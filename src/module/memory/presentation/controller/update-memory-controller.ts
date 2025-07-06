import { SessionDTO } from "../../../auth";
import { Controller, created, HttpResponse } from "../../../common";
import {
  UpdateMemoryUseCase,
  Input,
} from "../../application/use-case/update-memory-use-case";

export class UpdateMemoryController implements Controller {
  constructor(private readonly updateMemoryUseCase: UpdateMemoryUseCase) {}

  async handle({ session, ...rest }: Params): Promise<HttpResponse<unknown>> {
    const data = await this.updateMemoryUseCase.execute({
      ...rest,
      userId: session.user.id,
    });
    return created(data);
  }
}

type Params = Input & {
  session: SessionDTO;
};
