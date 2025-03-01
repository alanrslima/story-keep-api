import { InvalidNameError } from "../../error/invalid-name-error";

export class Name {
  private value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new InvalidNameError();
    }
    this.value = value;
  }

  private isValid(value: string) {
    if (typeof value !== "string" || value?.trim()?.length === 0) {
      return false;
    }
    return true;
  }

  getValue() {
    return this.value;
  }
}
