import { BaseError, BaseErrorSerializeProps } from "../../common";

export class MemoryOrderNotFoundError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Memory order not found");
    Object.setPrototypeOf(this, MemoryOrderNotFoundError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "Pedido de memória não escontrado",
      },
    ];
  }
}
