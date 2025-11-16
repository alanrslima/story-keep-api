import { BaseError, BaseErrorSerializeProps } from "../../common";

export class MemoryPlanChangeError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Memory plan change error");
    Object.setPrototypeOf(this, MemoryPlanChangeError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "O plano não pode ser escolhido",
        description: "Só é possível escolher um plano em fase de cadastramento",
      },
    ];
  }
}
