import { Controller, HttpResponse, ok } from "../../../common";
import { MediaRegistryQuery } from "../../application/contract/query/media-registry-query";

export class ListMediaRegistriesController implements Controller {
  constructor(private readonly mediaRegistryQuery: MediaRegistryQuery) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.mediaRegistryQuery.listByUserId({
      userId: params.session.user.id,
    });
    return ok(data);
  }
}

type Params = {
  memoryId: string;
  session: { user: { id: string } };
};
