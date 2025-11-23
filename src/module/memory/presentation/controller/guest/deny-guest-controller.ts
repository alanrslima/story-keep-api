import { SessionDTO } from "../../../../auth";
import { Controller, HttpResponse, ok } from "../../../../common";
import { DenyGuestUseCase } from "../../../application/use-case/guest/deny-guest-use-case";

export class DenyGuestController implements Controller {
  constructor(private readonly denyGuestUseCase: DenyGuestUseCase) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.denyGuestUseCase.execute({
      guestId: params.guestId,
      memoryId: params.memoryId,
      userId: params.session.user.id,
    });
    return ok(data);
  }
}

type Params = {
  session: SessionDTO;
  guestId: string;
  memoryId: string;
};
