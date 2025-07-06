import { MemoryOrderRepository } from "../../../application/contract/repository/memory-order-repository";
import { MemoryOrder } from "../../../domain/entity/memory-order";

export class MemoryOrderMysqlRepository implements MemoryOrderRepository {
  getById(id: string): Promise<MemoryOrder> {
    throw new Error("Method not implemented.");
  }
  create(memoryOrder: MemoryOrder): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(memoryOrder: MemoryOrder): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
