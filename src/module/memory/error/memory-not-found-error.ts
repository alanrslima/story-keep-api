import { BaseError, BaseErrorSerializeProps } from "../../common";

export class MemoryNotFoundError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Memory not found");
    Object.setPrototypeOf(this, MemoryNotFoundError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "Memória não encontrada",
      },
    ];
  }
}
