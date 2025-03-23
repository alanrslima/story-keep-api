import { BaseError, BaseErrorSerializeProps } from "../../common";

export class InvalidFilenameMediaRegistryError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Invalid filename media registry");
    Object.setPrototypeOf(this, InvalidFilenameMediaRegistryError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "O nome do arquivo deveria ser o mesmo",
      },
    ];
  }
}
