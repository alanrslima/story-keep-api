import { BaseError, BaseErrorSerializeProps } from "./base-error";

type ErrorParameter = {
  message: string;
  path: Array<string | number>;
};

export class InvalidParametersError extends BaseError {
  // Código 400 Bad Request
  statusCode = 400;

  constructor(public errors: ErrorParameter[]) {
    // A mensagem principal pode ser genérica, o detalhe está em 'errors'.
    super("Um ou mais parâmetros de entrada são inválidos.");
    this.name = "InvalidParametersError";
    Object.setPrototypeOf(this, InvalidParametersError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return this.errors.map((error) => ({
      message: error.message,
      // Converte o array de path em uma string de campo (ex: 'user.name[0].id')
      field: error.path.join("."),
    }));
  }
}
