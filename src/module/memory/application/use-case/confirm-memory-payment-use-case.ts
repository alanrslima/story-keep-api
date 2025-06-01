import { UseCase } from "../../../common";
import { MemoryRepository } from "../contract/repository/memory-repository";

export class ConfirmMemoryPaymentUseCase implements UseCase<Input, Output> {
  constructor(private readonly memoryRepository: MemoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const memory = await this.memoryRepository.getById(input.memoryId);
    memory.ready();
    await this.memoryRepository.update(memory);
  }
}

type Input = {
  memoryId: string;
};

type Output = void;
