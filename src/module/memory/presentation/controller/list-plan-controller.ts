import { Controller, HttpResponse, ok } from "../../../common";
import { PlanQuery } from "../../application/contract/query/plan-query";

export class ListPlanController implements Controller {
  constructor(private readonly planQuery: PlanQuery) {}

  async handle(): Promise<HttpResponse<unknown>> {
    const data = await this.planQuery.list();
    return ok(data);
  }
}
