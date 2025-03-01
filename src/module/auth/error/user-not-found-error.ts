import { BaseError, BaseErrorSerializeProps } from '../../common';

export class UserNotFoundError extends BaseError {
  statusCode = 400;

  constructor() {
    super('User not found');
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [{ message: 'User not found' }];
  }
}
