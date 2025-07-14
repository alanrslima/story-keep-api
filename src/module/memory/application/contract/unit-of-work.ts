import { MemoryRepository } from "./repository/memory-repository";

export interface UnitOfWork {
  memoryRepository: MemoryRepository;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
