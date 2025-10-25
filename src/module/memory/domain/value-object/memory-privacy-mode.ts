export class MemoryPrivacyMode {
  private VALID_MODES = new Set(["PRIVATE", "PUBLIC"]);

  private value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid memory mode");
    }
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  isValid(mimeType: string): boolean {
    return this.VALID_MODES.has(mimeType);
  }
}
