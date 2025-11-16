import { SessionDTO } from "../../../auth";
import { Controller, HttpResponse, ok } from "../../../common";
import {
  UpdateMemoryUseCase,
  Input,
} from "../../application/use-case/update-memory-use-case";

export class UpdateMemoryController implements Controller {
  constructor(private readonly updateMemoryUseCase: UpdateMemoryUseCase) {}

  private booleanParser(body: Record<string, any>) {
    const convert = (value: unknown) => {
      if (value === "true") return true;
      if (value === "false") return false;
      if (value === "1") return true;
      if (value === "0") return false;
      return value;
    };
    for (const key in body) {
      const value = body[key];
      if (Array.isArray(value)) {
        body[key] = value.map(convert);
      } else {
        body[key] = convert(value);
      }
    }
    return body;
  }

  async handle({ session, ...rest }: Params): Promise<HttpResponse<unknown>> {
    const parsed = this.booleanParser(rest) as Input;
    const data = await this.updateMemoryUseCase.execute({
      ...parsed,
      userId: session.user.id,
    });
    return ok(data);
  }
}

type Params = Input & {
  session: SessionDTO;
};
