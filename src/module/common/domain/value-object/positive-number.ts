export class PositiveNumber {
  private value: number;

  constructor(value: number) {
    if (!this.isPositiveNumber(value))
      throw new Error("Invalid positive number");
    this.value = value as number;
  }

  private isPositiveNumber(value: number): boolean {
    return typeof value === "number" && isFinite(value) && value > 0;
  }

  getValue() {
    return this.value;
  }
}
