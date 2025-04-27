import { StorageGateway } from "../../../application/contract/gateway/storage-gateway";
import { File } from "../../../domain/entity/file";

export class StorageMemoryGateway implements StorageGateway {
  private data: File[];

  constructor(mock?: File[]) {
    this.data = mock || [];
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
