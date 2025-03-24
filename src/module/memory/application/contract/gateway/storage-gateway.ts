export interface StorageGateway {
  getSignedUploadUrl(
    filename: string,
    config: {
      /** @description Tempo em segundos até a expiração da url */
      expiresIn: number;
    }
  ): Promise<{ url: string }>;
  getSignedGetUrl(
    filename: string,
    config: {
      /** @description Tempo em segundos até a expiração da url */
      expiresIn: number;
    }
  ): Promise<{ url: string }>;
}
