import { Controller, HttpResponse, ok } from "../../../common";
import { GetAddressByCoordsUseCase } from "../../application/use-case/get-address-by-coords-use-case";

export class getAddressByCoordsController implements Controller {
  constructor(
    private readonly getAddressByCoordsUseCase: GetAddressByCoordsUseCase
  ) {}

  async handle(params: any): Promise<HttpResponse<unknown>> {
    const data = await this.getAddressByCoordsUseCase.execute(params);
    return ok(data);
  }
}
