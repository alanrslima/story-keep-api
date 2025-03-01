import { BaseError, BaseErrorSerializeProps } from "../../common";

export class SessionNotFoundError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Session not found");
    Object.setPrototypeOf(this, SessionNotFoundError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [{ message: "Session not found" }];
  }
}
