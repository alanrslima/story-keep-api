import { env, MysqlDataSource } from "../../../../common";
import {
  MemoryQuery,
  MemoryQueryDetailInput,
  MemoryQueryDetailOutput,
  MemoryQueryListInput,
  MemoryQueryListMediaInput,
  MemoryQueryListMediaOutput,
  MemoryQueryListOutput,
} from "../../../application/contract/query/memory-query";
import { StorageR2Gateway } from "../../gateway/r2/storage-r2-gateway";

export class MemoryMysqlQuery implements MemoryQuery {
  private dataSource = MysqlDataSource.getInstance();

  async list(input: MemoryQueryListInput): Promise<MemoryQueryListOutput[]> {
    const sql = `SELECT 
      id, 
      name, 
      address,
      start_date as startDate, 
      photos_count as photosCount, 
      videos_count as videosCount, 
      cover_image as coverImage 
      FROM memory WHERE user_id = ?`;
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

  async detail(
    input: MemoryQueryDetailInput
  ): Promise<MemoryQueryDetailOutput | undefined> {
    let sql = `SELECT 
      id, 
      name, 
      start_date, 
      address, 
      photos_count, 
      videos_count, 
      cover_image,
      status,
      created_at as createdAt 
    FROM memory WHERE user_id = ? AND id = ?`;
    const [memoryResponse] = await this.dataSource.query(sql, [
      input.userId,
      input.memoryId,
    ]);
    if (!memoryResponse) return undefined;
    sql = `SELECT id, name, mimetype, url FROM media_registry WHERE memory_id = ? LIMIT 10`;
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
    let coverImage;
    if (memoryResponse.cover_image) {
      coverImage = await storageR2Gateway.getSignedGetUrl(
        memoryResponse.cover_image,
        { expiresIn: Number(env.READ_MEDIA_EXPIRES_IN) }
      );
    }
    return {
      id: memoryResponse.id,
      startDate: memoryResponse.start_date,
      name: memoryResponse.name,
      status: memoryResponse.status,
      address: memoryResponse.address,
      media: media,
      mediaUrl: "",
      about: "",
      coverImage,
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
