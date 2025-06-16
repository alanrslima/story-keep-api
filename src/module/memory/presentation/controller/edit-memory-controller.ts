import { SessionDTO } from "../../../auth/application/contract/dto/session-dto";
import { Controller, HttpResponse, ok } from "../../../common";
import { EditMemoryUseCase } from "../../application/use-case/edit-memory-use-case";

export class EditMemoryController implements Controller {
  constructor(private readonly editMemoryUseCase: EditMemoryUseCase) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.editMemoryUseCase.execute({
      userId: params.session.user.id,
      memoryId: params.memoryId,
      address: params.address,
      name: params.name,
      startDate: params.startDate,
    });
    return ok(data);
  }
}

type Params = {
  session: SessionDTO;
  [key: string]: any;
};
