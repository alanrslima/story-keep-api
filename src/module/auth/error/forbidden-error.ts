import { BaseError } from "../../common";

export class ForbiddenError extends BaseError {
  statusCode = 403;

  constructor() {
    super("Forbidden");
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serialize(): { message: string; field?: string | undefined }[] {
    return [
      {
        message:
          "O usuário não possui permissão para acessar este recurso ou executar esta ação",
      },
    ];
  }
}
