import { v7 } from "uuid";

export class ID {
  private value: string;

  constructor(id?: string) {
    this.value = id || v7();
  }

  getValue() {
    return this.value;
  }
}
