import { BaseRepository } from "../../../../common/application/contract/base-repository";
import { Memory } from "../../../domain/entity/memory";

export interface MemoryRepository extends BaseRepository {
  getById(id: string): Promise<Memory>;
  create(memory: Memory): Promise<void>;
  update(memory: Memory): Promise<void>;
}
