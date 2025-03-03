import { PositiveNumber } from "../positive-number";

it("should not create a positive number code with invalid input", () => {
  try {
    new PositiveNumber("Invalid input");
  } catch (error) {
    expect(error).toBeDefined();
  }
});

it("should not create a positive number with negative value", () => {
  try {
    new PositiveNumber(-10);
  } catch (error) {
    expect(error).toBeDefined();
  }
});

it("should create a postitive number with valid input", () => {
  const number = new PositiveNumber(10);
  expect(number.getValue()).toBe(10);
});
