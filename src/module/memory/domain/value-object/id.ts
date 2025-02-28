import { randomUUID } from "crypto";

export class ID {
  private value: string;

  constructor(id?: string) {
    this.value = id || randomUUID();
  }

  getValue() {
    return this.value;
  }
}
