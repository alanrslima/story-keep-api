import { HandleControllerErrors } from "../../../../main/application";
import {
  Controller,
  ControllerInput,
  ControllerOutput,
  ok,
} from "../../../common";
import { ListMemoryMessageQuery } from "../../application/contract/query/list-memory-message-query";
import { listMemoryMessageQuerySchema } from "../validators/list-memory-message-query.schema";

export class ListMemoryMessageController implements Controller {
  constructor(
    private readonly listMemoryMessageQuery: ListMemoryMessageQuery,
  ) {}

  @HandleControllerErrors()
  async handle({ req }: ControllerInput): Promise<ControllerOutput<unknown>> {
    const parsed = await listMemoryMessageQuerySchema.parseAsync(req.query);
    const result = await this.listMemoryMessageQuery.execute(parsed);
    return ok(result);
  }
}
