import { CurrencyCode } from "../currency-code";

it("should not create a currency code with invalid input", () => {
  try {
    new CurrencyCode("XYZ");
  } catch (error) {
    expect(error).toBeDefined();
  }
});

it("should create a currency code with valid input", () => {
  const currencyCode = new CurrencyCode("BRL");
  expect(currencyCode.getValue()).toBe("BRL");
});
