import { Controller, created, HttpResponse } from "../../../common";
import {
  InitMemoryMediaRegistryUseCase,
  Input,
} from "../../application/use-case/init-memory-media-registry-use-case";

export class InitMemoryMediaRegistryController implements Controller {
  constructor(
    private readonly initMemoryMediaRegistryUseCase: InitMemoryMediaRegistryUseCase,
  ) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.initMemoryMediaRegistryUseCase.execute({
      ...params,
      userId: params.session.user.id,
    });
    return created(data);
  }
}

type Params = Input & {
  session: { user: { id: string } };
};
