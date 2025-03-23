import { BaseError, BaseErrorSerializeProps } from "../../common";

export class InvalidPersonaMediaRegistryError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Invalid persona media registry");
    Object.setPrototypeOf(this, InvalidPersonaMediaRegistryError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "A persona deveria ser a mesma",
      },
    ];
  }
}
