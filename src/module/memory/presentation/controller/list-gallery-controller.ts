import { Controller, HttpResponse, ok } from "../../../common";
import { ListGalleryUseCase } from "../../application/use-case/gallery/list-gallery-use-case";

export class ListGalleryController implements Controller {
  constructor(private readonly listGalleryUseCase: ListGalleryUseCase) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.listGalleryUseCase.execute({
      userId: params.session.user.id,
      memoryId: params.memoryId,
      page: params.page,
    });
    return ok(data);
  }
}

type Params = {
  memoryId: string;
  page?: number;
  session: { user: { id: string } };
};
