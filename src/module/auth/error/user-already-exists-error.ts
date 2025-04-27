import { BaseError, BaseErrorSerializeProps } from "../../common";

export class UserAlreadyExistsError extends BaseError {
  statusCode = 409;

  constructor() {
    super("User already exists");
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "Não foi possível processar seu cadastro.",
      },
    ];
  }
}
