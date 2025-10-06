import { MemoryRepository } from "./repository/memory-repository";

export interface UnitOfWork {
  execute<T>(work: () => Promise<T>): Promise<T>;
  memoryRepository: MemoryRepository;
}
