import { Email } from '../email';

it('should create an email', () => {
  const email = new Email('john@email.com');
  expect(email.getValue()).toBe('john@email.com');
});

it('should not create an invalid email', () => {
  const email = () => new Email('invalid email');
  expect(email).toThrow();
});

it('should not create an empty email', () => {
  const email = () => new Email('');
  expect(email).toThrow();
});
