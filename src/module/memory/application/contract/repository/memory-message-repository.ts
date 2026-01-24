import { BaseRepository } from "../../../../common/application/contract/base-repository";
import { MemoryMessage } from "../../../domain/entity/memory-message";

export interface MemoryMessageRepository extends BaseRepository {
  create(memoryMessage: MemoryMessage): Promise<void>;
}
