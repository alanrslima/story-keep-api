const availableStatus = [
  "PENDING",
  "ACCEPTED",
  "DECLINED",
  "EXPIRED",
  "CANCELED",
  "BLOCKED",
];

export class GuestStatus {
  value: string;
  private availableSet = new Set(availableStatus);

  constructor(value: string) {
    if (!this.isValid(value)) throw new Error("Invalid guest status");
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  isValid(name: string): boolean {
    return this.availableSet.has(name);
  }
}
