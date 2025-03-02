import { Controller, created, HttpResponse } from "../../../common";
import { CreateMemoryUseCase } from "../../application/use-case/create-memory-use-case";

export class CreateMemoryController implements Controller {
  constructor(private readonly createMemoryUseCase: CreateMemoryUseCase) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.createMemoryUseCase.execute(params);
    return created(data);
  }
}
