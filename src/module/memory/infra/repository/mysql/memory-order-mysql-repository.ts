import { MysqlDataSource } from "../../../../common";
import { MemoryOrderRepository } from "../../../application/contract/repository/memory-order-repository";
import { MemoryOrder } from "../../../domain/entity/memory-order";
import { MemoryOrderNotFoundError } from "../../../error/memory-order-not-found-error";

export class MemoryOrderMysqlRepository implements MemoryOrderRepository {
  private dataSource = MysqlDataSource.getInstance();

  async getById(id: string): Promise<MemoryOrder> {
    const sql = `SELECT id, memory_id, status, currency_code, price, discount, total WHERE id = ?`;
    const [response] = await this.dataSource.query(sql, [id]);
    if (!response) throw new MemoryOrderNotFoundError();
    return MemoryOrder.build({
      id: response.id,
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
    (id, memory_id, user_id, status, currency_code, price, discount, total) 
    VALUES (?,?,?,?,?,?,?,?)`;
    await this.dataSource.query(sql, [
      memoryOrder.getId(),
      memoryOrder.getMemoryId(),
      memoryOrder.getUserId(),
      memoryOrder.getStatus(),
      memoryOrder.getCurrencyCode(),
      memoryOrder.getPrice(),
      memoryOrder.getDiscount(),
      memoryOrder.getTotal(),
    ]);
  }
  async update(memoryOrder: MemoryOrder): Promise<void> {
    const sql = `UPDATE memory_order SET memory_id = ?, user_id = ?, status = ?, currency_code = ?, price = ?, discount = ?, total = ? WHERE id = ?`;
    await this.dataSource.query(sql, [
      memoryOrder.getMemoryId(),
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
