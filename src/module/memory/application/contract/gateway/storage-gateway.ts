import { File } from "../../../domain/entity/file";

export interface StorageGateway {
  getSignedUploadUrl(
    filename: string,
    config: { expiresIn: number }
  ): Promise<{ url: string }>;
  getSignedGetUrl(
    filename: string,
    config: { expiresIn: number }
  ): Promise<{ url: string }>;
  upload(file: File): Promise<void>;
}
