import { Controller, HttpResponse, ok } from "../../../common";
import { ReadMediaRegistryUseCase } from "../../application/use-case/read-media-registry-use-case";

export class ReadMediaRegistryController implements Controller {
  constructor(
    private readonly readMediaRegistryUseCase: ReadMediaRegistryUseCase
  ) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.readMediaRegistryUseCase.execute(params);
    return ok(data);
  }
}
