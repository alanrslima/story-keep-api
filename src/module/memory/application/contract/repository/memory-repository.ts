import { Memory } from "../../../domain/entity/memory";

export interface MemoryRepository {
  getById(id: string): Promise<Memory>;
  create(memory: Memory): Promise<void>;
  update(memory: Memory): Promise<void>;
}
