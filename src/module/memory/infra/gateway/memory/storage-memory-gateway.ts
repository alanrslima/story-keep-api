import { StorageGateway } from "../../../application/contract/gateway/storage-gateway";

export class StorageMemoryGateway implements StorageGateway {
  async getSignedUploadUrl(): Promise<{ url: string }> {
    return { url: "example-url.com" };
  }
}
