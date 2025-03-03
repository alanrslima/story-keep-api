export class CurrencyCode {
  private value: string;

  constructor(value: unknown) {
    if (!this.isValidCurrencyCode(value))
      throw new Error("Invalid currency code");
    this.value = value as string;
  }

  private isValidCurrencyCode(code: unknown): boolean {
    if (typeof code !== "string") return false;
    try {
      new Intl.NumberFormat("en-US", { style: "currency", currency: code });
      return true;
    } catch {
      return false;
    }
  }

  getValue() {
    return this.value;
  }
}
