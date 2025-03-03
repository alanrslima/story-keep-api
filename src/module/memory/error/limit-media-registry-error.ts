import { BaseError, BaseErrorSerializeProps } from "../../common";

export class LimitMediaRegistryError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Limit media registry");
    Object.setPrototypeOf(this, LimitMediaRegistryError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "Limite de registros",
        description: "O limite de registros foi alcançado",
      },
    ];
  }
}
