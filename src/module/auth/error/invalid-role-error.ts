import { BaseError, BaseErrorSerializeProps } from "../../common";

export class InvalidRoleError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Invalid role");
    Object.setPrototypeOf(this, InvalidRoleError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [{ message: "Invalid role" }];
  }
}
