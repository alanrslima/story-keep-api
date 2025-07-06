import { UseCase } from "../../../common";
import { Memory } from "../../domain/entity/memory";
import { MemoryRepository } from "../contract/repository/memory-repository";

export class InitMemoryUseCase implements UseCase<Input, Output> {
  constructor(private readonly memoryRepository: MemoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const memory = Memory.create({
      userId: input.userId,
    });
    this.memoryRepository.create(memory);
    return { id: memory.getId() };
  }
}

export type Input = {
  userId: string;
};

export type Output = { id: string };
