import { BaseError, BaseErrorSerializeProps } from '../../common';

export class InvalidPasswordError extends BaseError {
  statusCode = 400;

  constructor() {
    super('Invalid password');
    Object.setPrototypeOf(this, InvalidPasswordError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [{ message: 'A senha deve possuir pelo menos 6 dígitos' }];
  }
}
