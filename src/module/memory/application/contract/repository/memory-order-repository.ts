import { BaseRepository } from "../../../../common/application/contract/base-repository";
import { MemoryOrder } from "../../../domain/entity/memory-order";

export interface MemoryOrderRepository extends BaseRepository {
  getById(id: string): Promise<MemoryOrder>;
  create(memoryOrder: MemoryOrder): Promise<void>;
  update(memoryOrder: MemoryOrder): Promise<void>;
}
