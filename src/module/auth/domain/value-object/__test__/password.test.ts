import { Password } from "../password";

it("should create a new password", () => {
  const password = Password.create({ rawPassword: "123456" });
  expect(password.getHash()).toBeDefined();
  expect(password.getSalt()).toBeDefined();
});

it("should valid a correct password", () => {
  const password = Password.create({ rawPassword: "123456" });
  const isValid = password.valid("123456");
  expect(isValid).toBeTruthy();
});

it("should valid an invalid password", () => {
  const password = Password.create({ rawPassword: "123456" });
  const isValid = password.valid("123");
  expect(isValid).not.toBeTruthy();
});

it("should not create a invalid password", () => {
  const password = () => {
    Password.create({ rawPassword: "123" });
  };
  expect(password).toThrow();
});
