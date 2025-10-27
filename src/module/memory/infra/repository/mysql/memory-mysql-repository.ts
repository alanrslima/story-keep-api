import { EntityManager } from "typeorm";
import { MemoryRepository } from "../../../application/contract/repository/memory-repository";
import { Discount } from "../../../domain/entity/discount";
import { Guest } from "../../../domain/entity/guest";
import { Image } from "../../../domain/entity/image";
import { Memory } from "../../../domain/entity/memory";
import { Plan } from "../../../domain/entity/plan";
import { MemoryNotFoundError } from "../../../error/memory-not-found-error";

export class MemoryMysqlRepository implements MemoryRepository {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
  }

  setManager(manager: EntityManager): void {
    this.manager = manager;
  }

  async create(memory: Memory): Promise<void> {
    let sql = `INSERT INTO memory (id, name, about, start_date, plan_id, user_id, status, privacy_mode, photos_count, videos_count, address, cover_image) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    await this.manager.query(sql, [
      memory.getId(),
      memory.getName(),
      memory.getAbout(),
      memory.getStartDate(),
      memory.getPlan()?.getId(),
      memory.getUserId(),
      memory.getStatus(),
      memory.getPrivacyMode(),
      memory.getPhotosCount(),
      memory.getVideosCount(),
      memory.getAddress(),
      memory.getCoverImageName(),
    ]);
    if (memory.getGuests().length) {
      const data = memory
        .getGuests()
        .map((guest) => [guest.getUserId(), memory.getId(), guest.getStatus()]);
      sql = `INSERT INTO memory_guest (user_id, memory_id, status) VALUES ?`;
      await this.manager.query(sql, [data]);
    }
  }

  private async getMemoryGuests(memoryId: string): Promise<Guest[]> {
    const sql = `SELECT status, user_id as userId FROM memory_guest WHERE memory_id = ?`;
    const response = await this.manager.query(sql, [memoryId]);
    return response.map(Guest.build);
  }

  async getById(id: string): Promise<Memory> {
    const sql = `SELECT a.id,
      a.name,
      a.about,
      a.start_date,
      a.plan_id,
      a.user_id,
      a.status,
      a.privacy_mode,
      a.address,
      a.cover_image,
      a.photos_count,
      a.videos_count,
      b.name as plan_name,
      b.description as plan_description,
      b.currency_code as plan_currency,
      b.price_cents as plan_price,
      b.position as plan_position,
      b.photos_limit as plan_photos_limit,
      b.videos_limit as plan_videos_limit,
      b.discount_id as plan_discount_id,
      c.name as plan_discount_name,
      c.percentage as plan_discount_percentage
    FROM memory a 
    LEFT JOIN memory_plan b ON a.plan_id = b.id 
    LEFT JOIN discount c ON b.discount_id = c.id
    WHERE a.id = ?`;
    const [response] = await this.manager.query(sql, [id]);
    if (!response) throw new MemoryNotFoundError();
    let discount;
    if (response.plan_discount_id) {
      discount = Discount.build({
        id: response.xzplan_discount_id,
        name: response.plan_discount_name,
        percentage: response.plan_discount_percentage,
      });
    }
    let plan: Plan | undefined;
    if (response.plan_id) {
      plan = Plan.build({
        id: response.plan_id,
        currencyCode: response.plan_currency,
        description: response.plan_description,
        name: response.plan_name,
        priceCents: response.plan_price,
        photosLimit: response.plan_photos_limit,
        videosLimit: response.plan_videos_limit,
        discount,
        position: response.plan_position,
      });
    }
    const guests = await this.getMemoryGuests(id);
    return Memory.build({
      id: response.id,
      guests,
      privacyMode: response.privacy_mode,
      startDate: response.start_date,
      about: response.about,
      name: response.name,
      photosCount: response.photos_count,
      plan,
      status: response.status,
      userId: response.user_id,
      videosCount: response.videos_count,
      address: response.address,
      isPrivate: false,
      coverImage: response.cover_image
        ? Image.build({
            mimetype: "image/png",
            name: response.cover_image,
            size: 1000,
          })
        : undefined,
    });
  }

  async update(memory: Memory): Promise<void> {
    let sql = `UPDATE memory SET name = ?, about = ?, start_date = ?, plan_id = ?, privacy_mode = ?, user_id = ?, status = ?, photos_count = ?, videos_count = ?, address = ?, cover_image = ? WHERE id = ?`;
    await this.manager.query(sql, [
      memory.getName(),
      memory.getAbout(),
      memory.getStartDate(),
      memory.getPlan()?.getId(),
      memory.getPrivacyMode(),
      memory.getUserId(),
      memory.getStatus(),
      memory.getPhotosCount(),
      memory.getVideosCount(),
      memory.getAddress(),
      memory.getCoverImageName(),
      memory.getId(),
    ]);
    sql = `DELETE FROM memory_guest WHERE memory_id = ?`;
    await this.manager.query(sql, [memory.getId()]);
    if (memory.getGuests().length) {
      const data = memory
        .getGuests()
        .map((guest) => [guest.getUserId(), memory.getId(), guest.getStatus()]);
      sql = `INSERT INTO memory_guest (user_id, memory_id, status) VALUES ?`;
      await this.manager.query(sql, [data]);
    }
  }
}
