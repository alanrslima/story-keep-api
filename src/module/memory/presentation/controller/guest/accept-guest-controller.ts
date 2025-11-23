import { SessionDTO } from "../../../../auth";
import { Controller, HttpResponse, ok } from "../../../../common";
import { AcceptGuestUseCase } from "../../../application/use-case/guest/accept-guest-use-case";

export class AcceptGuestController implements Controller {
  constructor(private readonly acceptGuestUseCase: AcceptGuestUseCase) {}

  async handle(params: Params): Promise<HttpResponse<unknown>> {
    const data = await this.acceptGuestUseCase.execute({
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
