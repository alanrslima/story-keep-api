import { InvalidEmailError } from "../../error/invalid-email-error";

export class Email {
  private value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new InvalidEmailError();
    }
    this.value = value;
  }

  private isValid(value: string) {
    if (typeof value !== "string" || value?.trim()?.length === 0) {
      return false;
    }
    const regex = /\S+@\S+\.\S+/;
    return regex.test(String(value));
  }

  getValue() {
    return this.value;
  }
}
