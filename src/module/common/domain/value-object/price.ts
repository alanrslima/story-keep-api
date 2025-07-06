export class Price {
  private value: number;

  constructor(value: unknown) {
    if (!this.isValid(value)) throw new Error("Invalid positive number");
    this.value = value as number;
  }

  private isValid(value: unknown): boolean {
    return typeof value === "number" && isFinite(value) && value >= 0;
  }

  getValue() {
    return this.value;
  }
}
