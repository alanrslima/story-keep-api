import { SessionDTO } from "../../../auth";
import { Controller, HttpResponse, ok } from "../../../common";
import { MemoryQuery } from "../../application/contract/query/memory-query";

export class GetGuestController implements Controller {
  constructor(private readonly memoryQuery: MemoryQuery) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.memoryQuery.getGuest({
      memoryId: params.memoryId,
      userId: params.session.user.id,
    });
    return ok(data);
  }
}

type Params = {
  memoryId: string;
  session: SessionDTO;
};
