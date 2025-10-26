import { BaseError, BaseErrorSerializeProps } from "../../common";

export enum NotAuthorizedTypes {
  /** Nenhum header Authorization foi enviado. */
  AUTH_TOKEN_MISSING = "AUTH_TOKEN_MISSING",
  /** Token inválido, corrompido ou não decodificável. */
  AUTH_TOKEN_INVALID = "AUTH_TOKEN_INVALID",
  /** Token JWT expirou (campo exp). */
  AUTH_TOKEN_EXPIRED = "AUTH_TOKEN_EXPIRED",
  /** Token foi assinado com chave errada. */
  AUTH_TOKEN_SIGNATURE_INVALID = "AUTH_TOKEN_SIGNATURE_INVALID",
  /** Email/senha incorretos. */
  AUTH_INVALID_CREDENTIALS = "AUTH_INVALID_CREDENTIALS",
  /** Conta bloqueada, deletada ou inativa. */
  AUTH_USER_DISABLED = "AUTH_USER_DISABLED",
  /** Token foi revogado manualmente. */
  AUTH_TOKEN_REVOKED = "AUTH_TOKEN_REVOKED",
}

export class NotAuthorizedError extends BaseError {
  statusCode = 401;

  constructor(private readonly type: NotAuthorizedTypes) {
    super("Not authorized");
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [{ message: "Não autorizado", error: this.type }];
  }
}
