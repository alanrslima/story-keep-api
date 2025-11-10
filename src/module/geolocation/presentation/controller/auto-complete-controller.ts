import { Controller, HttpResponse, ok } from "../../../common";
import { AutoCompleteUseCase } from "../../application/use-case/auto-complete-use-case";

export class AutoCompleteController implements Controller {
  constructor(private readonly autoCompleteUseCase: AutoCompleteUseCase) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.autoCompleteUseCase.execute(params);
    return ok(data);
  }
}
