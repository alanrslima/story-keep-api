export interface StorageGateway {
  getSignedUploadToken(): Promise<{ token: string }>;
}
