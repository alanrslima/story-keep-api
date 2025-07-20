import { Controller, created, HttpResponse } from "../../../common";
import { AddGuestsToMemoryUseCase } from "../../application/use-case/add-guests-to-memory-use-case";

export class AddGuestsToMemoryController implements Controller {
  constructor(
    private readonly addGuestsToMemoryUseCase: AddGuestsToMemoryUseCase
  ) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.addGuestsToMemoryUseCase.execute(params);
    return created(data);
  }
}
