import { env, MysqlDataSource } from "../../../../common";
import {
  MemoryQuery,
  MemoryQueryDetailInput,
  MemoryQueryDetailOutput,
  MemoryQueryListInput,
  MemoryQueryListMediaInput,
  MemoryQueryListMediaOutput,
  MemoryQueryListOutput,
  MemoryQueryResumeInput,
  MemoryQueryResumeOutput,
} from "../../../application/contract/query/memory-query";
import { StorageR2Gateway } from "../../gateway/r2/storage-r2-gateway";

export class MemoryMysqlQuery implements MemoryQuery {
  private dataSource = MysqlDataSource.getInstance();

  async list(input: MemoryQueryListInput): Promise<MemoryQueryListOutput[]> {
    const sql = `SELECT 
      id, 
      name, 
      address,
      privacy_mode as privacyMode,
      start_date as startDate, 
      photos_count as photosCount, 
      videos_count as videosCount, 
      status,
      cover_image as coverImage 
      FROM memory WHERE user_id = ?
      ORDER BY created_at DESC`;
    const response = await this.dataSource.query(sql, [input.userId]);
    const storageR2Gateway = new StorageR2Gateway();
    const data = await Promise.all(
      response.map(async (item: any) => {
        if (item.coverImage) {
          const coverImage = await storageR2Gateway.getSignedGetUrl(
            item.coverImage,
            { expiresIn: Number(env.READ_MEDIA_EXPIRES_IN) }
          );
          return { ...item, coverImage };
        }
        return item;
      })
    );
    return data;
  }

  async resume(
    input: MemoryQueryResumeInput
  ): Promise<MemoryQueryResumeOutput> {
    console.log("input", input);
    const sql = `SELECT 
      id, 
      name, 
      address,
      privacy_mode as privacyMode,
      start_date as startDate, 
      cover_image as coverImage 
      FROM memory WHERE id = ?`;
    const [response] = await this.dataSource.query(sql, [input.memoryId]);
    console.log("response", response);
    const coverImage = await this.getImageUrl(response?.coverImage);
    return { ...response, coverImage };
  }

  private async getImageUrl(
    name?: string
  ): Promise<{ url: string } | undefined> {
    if (!name) return;
    const storageR2Gateway = new StorageR2Gateway();
    return storageR2Gateway.getSignedGetUrl(name, {
      expiresIn: Number(env.READ_MEDIA_EXPIRES_IN),
    });
  }

  async detail(
    input: MemoryQueryDetailInput
  ): Promise<MemoryQueryDetailOutput | undefined> {
    let sql = `SELECT 
      a.id, 
      a.name, 
      a.start_date, 
      a.address, 
      a.privacy_mode,
      a.photos_count, 
      a.videos_count, 
      a.cover_image,
      a.status,
      a.created_at as createdAt,
      b.id as plan_id,
      b.name as plan_name,
      b.photos_limit,
      b.videos_limit,
      b.description as plan_description,
      b.currency_code as plan_currency_code,
      b.price_cents as plan_price,
      b.photos_limit as plan_photos_limit,
      b.videos_limit as plan_videos_limit
    FROM memory a 
    LEFT JOIN memory_plan b ON a.plan_id = b.id
    WHERE a.id = ? and a.user_id = ?`;
    const [memoryResponse] = await this.dataSource.query(sql, [
      input.memoryId,
      input.userId,
    ]);
    if (!memoryResponse) return undefined;
    sql = `SELECT id, name, mimetype, url FROM media_registry WHERE memory_id = ? AND status = "ready" ORDER BY created_at DESC LIMIT 20`;
    const mediaResponse = await this.dataSource.query(sql, [input.memoryId]);
    const storageR2Gateway = new StorageR2Gateway();
    const media = await Promise.all(
      mediaResponse.map(async (item) => {
        const { url } = await storageR2Gateway.getSignedGetUrl(item.name, {
          expiresIn: Number(env.READ_MEDIA_EXPIRES_IN),
        });
        return {
          id: item.id,
          name: item.name,
          mimetype: item.mimetype,
          url,
        };
      })
    );
    const coverImage = await this.getImageUrl(memoryResponse.cover_image);
    sql = `SELECT user_id, status FROM memory_guest WHERE memory_id = ?`;
    const guestsResponse = await this.dataSource.query(sql, [input.memoryId]);
    return {
      id: memoryResponse.id,
      startDate: memoryResponse.start_date,
      name: memoryResponse.name,
      status: memoryResponse.status,
      privacyMode: memoryResponse.privacy_mode,
      address: memoryResponse.address,
      media: media,
      mediaUrl: "",
      about: "",
      guests: guestsResponse,
      coverImage,
      plan: memoryResponse.plan_id && {
        currencyCode: memoryResponse.plan_currencyCode,
        description: memoryResponse.plan_description,
        id: memoryResponse.plan_id,
        name: memoryResponse.plan_name,
        price: memoryResponse.plan_price,
        photosLimit: memoryResponse.photos_limit,
        videosLimit: memoryResponse.videos_limit,
      },
      videosCount: memoryResponse.videos_count,
      photosCount: memoryResponse.photos_count,
      createdAt: memoryResponse.createdAt,
    };
  }

  async listMedia(
    input: MemoryQueryListMediaInput
  ): Promise<MemoryQueryListMediaOutput[]> {
    const sql = ``;
    return this.dataSource.query(sql, [input.userId]);
  }
}
