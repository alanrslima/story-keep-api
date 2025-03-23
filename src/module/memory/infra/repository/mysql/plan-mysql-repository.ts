import { MysqlDataSource } from "../../../../common";
import { PlanRepository } from "../../../application/contract/repository/plan-repository";
import { Discount } from "../../../domain/entity/discount";
import { Plan } from "../../../domain/entity/plan";
import { PlanNotFoundError } from "../../../error/plan-not-found-error";

export class PlanMysqlRepository implements PlanRepository {
  private dataSource = MysqlDataSource.getInstance();

  async create(plan: Plan): Promise<void> {
    const sql = `INSERT INTO memory_plan (id, name, description, currency_code, price, photos_limit, videos_limit, discount_id) VALUES (?,?,?,?,?,?,?,?)`;
    await this.dataSource.query(sql, [
      plan.getId(),
      plan.getName(),
      plan.getDescription(),
      plan.getCurrencyCode(),
      plan.getPrice(),
      plan.getPhotosLimit(),
      plan.getVideosLimit(),
      plan.getDiscount()?.getId(),
    ]);
  }

  async getById(id: string): Promise<Plan> {
    const sql = `SELECT a.id, a.name, a.description, a.currency_code, a.price, a.photos_limit, a.videos_limit, a.discount_id, b.id as discount_id, b.name as discount_name, b.percentage as discount_percentage FROM memory_plan a LEFT JOIN discount b ON a.discount_id = b.id WHERE a.id = ?`;
    const [response] = await this.dataSource.query(sql, [id]);
    if (!response) throw new PlanNotFoundError();
    let discount: Discount | undefined = undefined;
    if (response.discount_id) {
      discount = Discount.build({
        id: response.discount_id,
        name: response.discount_name,
        percentage: response.discount_percentage,
      });
    }
    return Plan.build({
      currencyCode: response.currency_code,
      description: response.description,
      id: response.id,
      name: response.name,
      price: response.price,
      photosLimit: response.photos_limit,
      videosLimit: response.videos_limit,
      discount,
    });
  }

  async update(plan: Plan): Promise<void> {
    const sql = `UPDATE memory_plan SET name = ?, description = ?, currency_code = ?, price = ?, photos_limit = ?, videos_limit = ?, discount_id = ? WHERE id = ?`;
    this.dataSource.query(sql, [
      plan.getName(),
      plan.getDescription(),
      plan.getCurrencyCode(),
      plan.getPrice(),
      plan.getPhotosLimit(),
      plan.getVideosLimit(),
      plan.getDiscount()?.getId(),
      plan.getId(),
    ]);
  }
}
