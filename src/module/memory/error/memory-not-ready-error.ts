import { BaseError, BaseErrorSerializeProps } from "../../common";

export class MemoryNotReadyError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Memory not ready");
    Object.setPrototypeOf(this, MemoryNotReadyError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "A memória não esta pronta para receber registros.",
        description: "Verifique se o pagamento já foi efetuado com sucesso",
      },
    ];
  }
}
