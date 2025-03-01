import { Name } from '../name';

it('should create a name', () => {
  const name = new Name('john');
  expect(name.getValue()).toBe('john');
});

it('Shoul not create a name if the value is undefined', () => {
  const name = () => new Name(undefined!);
  expect(name).toThrow();
});

it('should not create a invalid name', () => {
  const name = () => new Name('');
  expect(name).toThrow();
});
