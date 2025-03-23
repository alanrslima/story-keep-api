import { Controller, created, HttpResponse } from "../../../common";
import { InitMemoryMediaRegistryUseCase } from "../../application/use-case/init-memory-media-registry-use-case";

export class InitMemoryMediaRegistryController implements Controller {
  constructor(
    private readonly initMemoryMediaRegistryUseCase: InitMemoryMediaRegistryUseCase
  ) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.initMemoryMediaRegistryUseCase.execute(params);
    return created(data);
  }
}
