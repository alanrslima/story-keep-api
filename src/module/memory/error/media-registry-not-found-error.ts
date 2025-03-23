import { BaseError, BaseErrorSerializeProps } from "../../common";

export class MediaRegistryNotFoundError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Media registry not found");
    Object.setPrototypeOf(this, MediaRegistryNotFoundError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "Registro de mídia não escontrado",
      },
    ];
  }
}
