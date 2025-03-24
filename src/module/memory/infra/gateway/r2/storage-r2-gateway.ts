import { StorageGateway } from "../../../application/contract/gateway/storage-gateway";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "../../../../common";

export class StorageR2Gateway implements StorageGateway {
  private r2Client: S3Client;
  private bucketName: string;

  constructor() {
    this.bucketName = "story-keep-prd";
    this.r2Client = new S3Client({
      region: "auto",
      endpoint:
        "https://77d163c388d88955814279a74ef0f571.r2.cloudflarestorage.com",
      credentials: {
        accessKeyId: env.R2_STORAGE_ACCESS_KEY_ID,
        secretAccessKey: env.R2_STORAGE_SECRET_ACCESS_KEY,
      },
    });
  }

  async getSignedUploadUrl(
    filename: string,
    config: { expiresIn: number }
  ): Promise<{ url: string }> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
    });
    const signedUrl = await getSignedUrl(this.r2Client, command, {
      expiresIn: config.expiresIn,
    });
    return { url: signedUrl };
  }

  async getSignedGetUrl(
    filename: string,
    config: { expiresIn: number }
  ): Promise<{ url: string }> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
    });
    const signedUrl = await getSignedUrl(this.r2Client, command, {
      expiresIn: config.expiresIn,
    });
    return { url: signedUrl };
  }
}
