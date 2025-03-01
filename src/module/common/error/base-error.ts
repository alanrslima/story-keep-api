export type BaseErrorSerializeProps = {
  message: string;
  description?: string;
}[];

export abstract class BaseError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract statusCode: number;
  abstract serialize(): BaseErrorSerializeProps;
}
