import { BaseError, BaseErrorSerializeProps } from '../../common';

export class InvalidEmailError extends BaseError {
  statusCode = 400;

  constructor() {
    super('Invalid email');
    Object.setPrototypeOf(this, InvalidEmailError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [{ message: 'Invalid e-mail' }];
  }
}
