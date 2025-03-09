import { Controller, created, HttpResponse } from "../../../common";
import { CreateMemoryMediaRegistryUseCase } from "../../application/use-case/create-memory-media-registry-use-case";

export class CreateMemoryMediaRegistryController implements Controller {
  constructor(
    private readonly createMemoryMediaRegistryUseCase: CreateMemoryMediaRegistryUseCase
  ) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.createMemoryMediaRegistryUseCase.execute(params);
    return created(data);
  }
}
