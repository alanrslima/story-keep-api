import { Memory } from "../../../domain/entity/memory";

export interface MemoryRepository {
  create(memory: Memory): Promise<void>;
  update(memory: Memory): Promise<void>;
}
