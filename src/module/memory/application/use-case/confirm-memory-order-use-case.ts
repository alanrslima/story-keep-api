import { UseCase } from "../../../common";
import { MemoryOrderRepository } from "../contract/repository/memory-order-repository";
import { MemoryRepository } from "../contract/repository/memory-repository";
import { PlanRepository } from "../contract/repository/plan-repository";

export class ConfirmMemoryOrderUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly memoryOrderRepository: MemoryOrderRepository,
    private readonly memoryRepository: MemoryRepository,
    private readonly planRepository: PlanRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const memoryOrder = await this.memoryOrderRepository.getById(
      input.memoryOrderId
    );
    const memory = await this.memoryRepository.getById(
      memoryOrder.getMemoryId()
    );
    const plan = await this.planRepository.getById(
      memoryOrder.getMemoryPlanId()
    );
    memoryOrder.confirmPayment();
    memory.confirmPayment(plan);
    await this.memoryOrderRepository.update(memoryOrder);
    await this.memoryRepository.update(memory);
  }
}

export type Input = {
  memoryOrderId: string;
};

export type Output = void;
