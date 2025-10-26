import { Controller, HttpResponse, ok } from "../../../common";
import { RequestMemoryInviteUseCase } from "../../application/use-case/request-memory-invite-use-case";

export class RequestMemoryInviteController implements Controller {
  constructor(
    private readonly requestMemoryInviteUseCase: RequestMemoryInviteUseCase
  ) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.requestMemoryInviteUseCase.execute({
      memoryId: params.memoryId,
      userId: params.session.user.id,
    });
    return ok(data);
  }
}

type Params = {
  memoryId: string;
  session: { user: { id: string } };
};
