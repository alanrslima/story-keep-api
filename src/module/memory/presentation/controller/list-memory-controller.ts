import { Controller, HttpResponse, ok } from "../../../common";
import { MemoryQuery } from "../../application/contract/query/memory-query";

export class ListMemoryController implements Controller {
  constructor(private readonly memoryQuery: MemoryQuery) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.memoryQuery.list({
      userId: params.session.user.id,
    });
    return ok(data);
  }
}

type Params = {
  session: { user: { id: string } };
};
