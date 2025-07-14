import { BaseError, BaseErrorSerializeProps } from "../../common";

export class MemoryWithoutPlanError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Memory without plan error");
    Object.setPrototypeOf(this, MemoryWithoutPlanError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "Nenhum plano foi selecionado para este al'bum de memórias",
      },
    ];
  }
}
