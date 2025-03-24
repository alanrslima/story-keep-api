import { BaseError, BaseErrorSerializeProps } from "../../common";

export class MediaRegistryForbiddenError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Media registry forbidden");
    Object.setPrototypeOf(this, MediaRegistryForbiddenError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "Você não possui acesso ao registro.",
      },
    ];
  }
}
