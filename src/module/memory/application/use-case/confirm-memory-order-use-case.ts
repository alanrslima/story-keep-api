import { UseCase } from "../../../common";
import { MemoryOrderRepository } from "../contract/repository/memory-order-repository";
import { MemoryRepository } from "../contract/repository/memory-repository";

export class ConfirmMemoryOrderUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly memoryOrderRepository: MemoryOrderRepository,
    private readonly memoryRepository: MemoryRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const memoryOrder = await this.memoryOrderRepository.getById(
      input.memoryOrderId
    );
    console.log("memoryOrder", memoryOrder);
    const memory = await this.memoryRepository.getById(
      memoryOrder.getMemoryId()
    );
    memoryOrder.succeeded();
    memory.ready();
    await this.memoryOrderRepository.update(memoryOrder);
    await this.memoryRepository.update(memory);
  }
}

export type Input = {
  memoryOrderId: string;
};

export type Output = void;
