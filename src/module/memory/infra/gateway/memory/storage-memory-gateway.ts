import { StorageGateway } from "../../../application/contract/gateway/storage-gateway";
import { File } from "../../../domain/entity/file";

export class StorageMemoryGateway implements StorageGateway {
  public data: File[];

  constructor(mock?: File[]) {
    this.data = mock || [];
  }
  delete(filename: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getSignedUploadUrl(): Promise<{ url: string }> {
    return { url: "example-url.com" };
  }

  async upload(file: File): Promise<void> {
    this.data.push(file);
  }

  async getSignedGetUrl(): Promise<{ url: string }> {
    return { url: "example-url.com" };
  }
}
