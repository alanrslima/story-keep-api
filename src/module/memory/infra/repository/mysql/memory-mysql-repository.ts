import { MysqlDataSource } from "../../../../common";
import { MemoryRepository } from "../../../application/contract/repository/memory-repository";
import { Discount } from "../../../domain/entity/discount";
import { Memory } from "../../../domain/entity/memory";
import { Plan } from "../../../domain/entity/plan";
import { MemoryNotFoundError } from "../../../error/memory-not-found-error";

export class MemoryMysqlRepository implements MemoryRepository {
  private dataSource = MysqlDataSource.getInstance();

  async create(memory: Memory): Promise<void> {
    const sql = `INSERT INTO memory (id, name, date, plan_id, user_id, status, photos_count, videos_count) VALUES (?,?,?,?,?,?,?,?)`;
    await this.dataSource.query(sql, [
      memory.getId(),
      memory.getName(),
      memory.getDate(),
      memory.getPlan().getId(),
      memory.getUserId(),
      memory.getStatus(),
      memory.getPhotosCount(),
      memory.getVideosCount(),
    ]);
  }

  async getById(id: string): Promise<Memory> {
    const sql = `SELECT a.id,
      a.name,
      a.date,
      a.plan_id,
      a.user_id,
      a.status,
      a.photos_count,
      a.videos_count,
      b.name as plan_name,
      b.description as plan_description,
      b.currency as plan_currency,
      b.price as plan_price,
      b.photos_limit as plan_photos_limit,
      b.videos_limit as plan_videos_limit,
      b.discount_id as plan_discount_id,
      c.name as plan_discount_name,
      c.percentage as plan_discount_percentage
    FROM memory a 
    LEFT JOIN memory_plan b ON a.plan_id = b.id 
    LEFT JOIN discount c ON b.discount_id = c.id
    WHERE a.id = ?`;
    const [response] = await this.dataSource.query(sql, [id]);
    if (!response) throw new MemoryNotFoundError();
    let discount;
    if (response.plan_discount_id) {
      discount = Discount.build({
        id: response.plan_discount_id,
        name: response.plan_discount_name,
        percentage: response.plan_discount_percentage,
      });
    }
    const plan = Plan.build({
      id: response.plan_id,
      currency: response.plan_currency,
      description: response.plan_description,
      name: response.plan_name,
      price: response.plan_price,
      photosLimit: response.plan_photos_limit,
      videosLimit: response.plan_videos_limit,
      discount,
    });
    return Memory.build({
      id: response.id,
      date: response.date,
      name: response.name,
      photosCount: response.photos_count,
      plan,
      status: response.status,
      userId: response.user_id,
      videosCount: response.videos_count,
    });
  }

  async update(memory: Memory): Promise<void> {
    const sql = `UPDATE memory SET name = ?, SET date = ?, SET plan_id = ?, SET user_id = ?, SET status = ?, SET photos_count = ?, SET videos_count = ? WHERE id = ?`;
    await this.dataSource.query(sql, [
      memory.getName(),
      memory.getDate(),
      memory.getPlan().getId(),
      memory.getUserId(),
      memory.getStatus(),
      memory.getPhotosCount(),
      memory.getVideosCount(),
      memory.getId(),
    ]);
  }
}
