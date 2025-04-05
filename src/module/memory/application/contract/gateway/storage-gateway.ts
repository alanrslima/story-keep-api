export interface StorageGateway {
  getSignedUploadUrl(
    filename: string,
    config: { expiresIn: number }
  ): Promise<{ url: string }>;
  getSignedGetUrl(
    filename: string,
    config: { expiresIn: number }
  ): Promise<{ url: string }>;
}
