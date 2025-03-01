export interface StorageGateway {
  getSignedUploadUrl(): Promise<{ url: string }>;
}
