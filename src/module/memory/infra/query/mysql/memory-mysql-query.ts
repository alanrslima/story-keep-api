import { MysqlDataSource } from "../../../../common";
import {
  MemoryQuery,
  MemoryQueryDetailInput,
  MemoryQueryDetailOutput,
  MemoryQueryListInput,
  MemoryQueryListMediaInput,
  MemoryQueryListMediaOutput,
  MemoryQueryListOutput,
} from "../../../application/contract/query/memory-query";

export class MemoryMysqlQuery implements MemoryQuery {
  private dataSource = MysqlDataSource.getInstance();

  async list(input: MemoryQueryListInput): Promise<MemoryQueryListOutput[]> {
    const sql = `SELECT id, name, date, photos_count as photosCount, videos_count as videosCount FROM memory WHERE user_id = ?`;
    return this.dataSource.query(sql, [input.userId]);
  }

  async detail(
    input: MemoryQueryDetailInput
  ): Promise<MemoryQueryDetailOutput | undefined> {
    let sql = `SELECT id, name, date, photos_count as photosCount, videos_count as videosCount, created_at as createdAt FROM memory WHERE user_id = ? AND id = ?`;
    const [memoryResponse] = await this.dataSource.query(sql, [
      input.userId,
      input.memoryId,
    ]);
    if (!memoryResponse) return undefined;
    sql = `SELECT id, name, mimetype, url FROM media_registry WHERE memory_id = ? LIMIT 10`;
    const mediaResponse = await this.dataSource.query(sql, [input.memoryId]);
    const media = mediaResponse.map((item: any) => ({
      id: item.id,
      name: item.name,
      mimetype: item.mimetype,
    }));
    return {
      id: memoryResponse.id,
      date: memoryResponse.date,
      name: memoryResponse.name,
      status: memoryResponse.status,
      media: media,
      mediaUrl: "",
      about: "",
      coverPhoto: undefined,
      videosCount: memoryResponse.videosCount,
      photosCount: memoryResponse.photosCount,
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
