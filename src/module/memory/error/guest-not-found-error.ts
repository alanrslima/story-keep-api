import { BaseError, BaseErrorSerializeProps } from "../../common";

export class GuestNotFoundError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Guest not found");
    Object.setPrototypeOf(this, GuestNotFoundError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "Convidado não encontrado",
        description:
          "Verifique se o convidado de fato existe no baú de memórias informado",
      },
    ];
  }
}
