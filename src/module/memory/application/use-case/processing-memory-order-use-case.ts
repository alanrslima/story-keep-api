import { UseCase } from "../../../common";
import { UnitOfWorkMemory } from "../contract/unit-of-work-memory";

export class WaitingMemoryOrderUseCase implements UseCase<Input, Output> {
  constructor(private readonly unitOfWorkMemory: UnitOfWorkMemory) {}

  async execute(input: Input): Promise<Output> {
    const memoryOrder = await this.unitOfWorkMemory.execute(
      ({ memoryOrderRepository }) =>
        memoryOrderRepository.getById(input.memoryOrderId)
    );
    const memory = await this.unitOfWorkMemory.execute(({ memoryRepository }) =>
      memoryRepository.getById(memoryOrder.getMemoryId())
    );
    memory.paymentInProgress();
    memoryOrder.waitingPayment();
    await this.unitOfWorkMemory.execute(
      async ({ memoryOrderRepository, memoryRepository }) => {
        await memoryOrderRepository.update(memoryOrder);
        await memoryRepository.update(memory);
      }
    );
  }
}

export type Input = {
  memoryOrderId: string;
};

export type Output = void;
