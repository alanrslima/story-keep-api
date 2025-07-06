import { MemoryOrder } from "../../../domain/entity/memory-order";

export interface MemoryOrderRepository {
  getById(id: string): Promise<MemoryOrder>;
  create(memoryOrder: MemoryOrder): Promise<void>;
  update(memoryOrder: MemoryOrder): Promise<void>;
}
