import { Controller, HttpResponse, ok } from "../../../common";
import { MemoryQuery } from "../../application/contract/query/memory-query";

export class DetailMemoryController implements Controller {
  constructor(private readonly memoryQuery: MemoryQuery) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.memoryQuery.detail({
      userId: params.session.user.id,
      memoryId: params.memoryId,
    });
    return ok(data);
  }
}

type Params = {
  memoryId: string;
  session: { user: { id: string } };
};
