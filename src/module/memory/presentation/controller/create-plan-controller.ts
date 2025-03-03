import { Controller, created, HttpResponse } from "../../../common";
import { CreatePlanUseCase } from "../../application/use-case/create-plan-use-case";

export class CreatePlanController implements Controller {
  constructor(private readonly createPlanUseCase: CreatePlanUseCase) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.createPlanUseCase.execute(params);
    return created(data);
  }
}
