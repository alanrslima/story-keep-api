import { File } from "../../../domain/entity/file";

export interface StorageGateway {
  getSignedUploadUrl(
    filename: string,
    config: { expiresIn: number; contentLength?: number; contentType?: string }
  ): Promise<{ url: string }>;
  getSignedGetUrl(
    filename: string,
    config: { expiresIn: number }
  ): Promise<{ url: string }>;
  upload(file: File): Promise<void>;
  delete(filename: string): Promise<void>;
}
