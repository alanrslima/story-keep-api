import { EntityManager } from "typeorm";
import { MemoryOrderRepository } from "../../../application/contract/repository/memory-order-repository";
import { MemoryOrder } from "../../../domain/entity/memory-order";
import { MemoryOrderNotFoundError } from "../../../error/memory-order-not-found-error";

export class MemoryOrderMysqlRepository implements MemoryOrderRepository {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
  }

  setManager(manager: EntityManager): void {
    this.manager = manager;
  }

  async getById(id: string): Promise<MemoryOrder> {
    const sql = `SELECT id, memory_id, memory_plan_id, status, currency_code, price, discount, total, user_id FROM memory_order WHERE id = ?`;
    const [response] = await this.manager.query(sql, [id]);
    if (!response) throw new MemoryOrderNotFoundError();
    return MemoryOrder.build({
      id: response.id,
      memoryPlanId: response.memory_plan_id,
      currencyCode: response.currency_code,
      discount: response.discount,
      memoryId: response.memory_id,
      price: response.price,
      status: response.status,
      total: response.total,
      userId: response.user_id,
    });
  }

  async create(memoryOrder: MemoryOrder): Promise<void> {
    const sql = `INSERT INTO memory_order 
    (id, memory_id, memory_plan_id, user_id, status, currency_code, price, discount, total) 
    VALUES (?,?,?,?,?,?,?,?,?)`;
    await this.manager.query(sql, [
      memoryOrder.getId(),
      memoryOrder.getMemoryId(),
      memoryOrder.getMemoryPlanId(),
      memoryOrder.getUserId(),
      memoryOrder.getStatus(),
      memoryOrder.getCurrencyCode(),
      memoryOrder.getPrice(),
      memoryOrder.getDiscount(),
      memoryOrder.getTotal(),
    ]);
  }

  async update(memoryOrder: MemoryOrder): Promise<void> {
    const sql = `UPDATE memory_order SET memory_id = ?, memory_plan_id = ?, user_id = ?, status = ?, currency_code = ?, price = ?, discount = ?, total = ? WHERE id = ?`;
    await this.manager.query(sql, [
      memoryOrder.getMemoryId(),
      memoryOrder.getMemoryPlanId(),
      memoryOrder.getUserId(),
      memoryOrder.getStatus(),
      memoryOrder.getCurrencyCode(),
      memoryOrder.getPrice(),
      memoryOrder.getDiscount(),
      memoryOrder.getTotal(),
      memoryOrder.getId(),
    ]);
  }
}
