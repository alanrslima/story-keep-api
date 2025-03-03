import { BaseError, BaseErrorSerializeProps } from "../../common";

export class PlanNotFoundError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Plan not found");
    Object.setPrototypeOf(this, PlanNotFoundError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "Plano não escontrado",
      },
    ];
  }
}
