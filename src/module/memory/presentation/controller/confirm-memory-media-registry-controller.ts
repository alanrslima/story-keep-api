import { Controller, HttpResponse, ok } from "../../../common";
import { ConfirmMemoryMediaRegistryUseCase } from "../../application/use-case/confirm-memory-media-registry-use-case";

export class ConfirmMemoryMediaRegistryController implements Controller {
  constructor(
    private readonly confirmMemoryMediaRegistryUseCase: ConfirmMemoryMediaRegistryUseCase
  ) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.confirmMemoryMediaRegistryUseCase.execute(params);
    return ok(data);
  }
}
