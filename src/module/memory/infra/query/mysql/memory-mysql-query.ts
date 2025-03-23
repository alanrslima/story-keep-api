import { MysqlDataSource } from "../../../../common";
import {
  MemoryQuery,
  MemoryQueryDetailInput,
  MemoryQueryDetailOutput,
  MemoryQueryListGalleryInput,
  MemoryQueryListGalleryOutput,
  MemoryQueryListInput,
  MemoryQueryListOutput,
} from "../../../application/contract/query/memory-query";

export class MemoryMysqlQuery implements MemoryQuery {
  private dataSource = MysqlDataSource.getInstance();

  async list(input: MemoryQueryListInput): Promise<MemoryQueryListOutput[]> {
    const sql = `SELECT 
      id,
      name,
      date,
      photos_count as photosCount,
      videos_count as videosCount
    FROM memory
    WHERE user_id = ?`;
    return this.dataSource.query(sql, [input.userId]);
  }

  async detail(
    input: MemoryQueryDetailInput
  ): Promise<MemoryQueryDetailOutput> {
    const sql = ``;
    return this.dataSource.query(sql, [input.userId]);
  }

  async listGallery(
    input: MemoryQueryListGalleryInput
  ): Promise<MemoryQueryListGalleryOutput[]> {
    const sql = ``;
    return this.dataSource.query(sql, [input.userId]);
  }
}
