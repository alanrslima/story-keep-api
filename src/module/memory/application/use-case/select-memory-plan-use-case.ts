import { UseCase } from "../../../common";
import { MemoryStatus } from "../../domain/enum/memory-status";
import { ForbiddenError } from "../../error/forbidden-error";
import { MemoryPlanChangeError } from "../../error/memory-plan-change-error";
import { MemoryRepository } from "../contract/repository/memory-repository";
import { PlanRepository } from "../contract/repository/plan-repository";

export class SelectMemoryPlanUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly memoryRepository: MemoryRepository,
    private readonly planRepository: PlanRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const memory = await this.memoryRepository.getById(input.memoryId);
    if (memory.getUserId() !== input.userId) throw new ForbiddenError();
    if (memory.getStatus() !== MemoryStatus.DRAFT)
      throw new MemoryPlanChangeError();
    const plan = await this.planRepository.getById(input.planId);
    memory.selectPlan(plan);
    await this.memoryRepository.update(memory);
  }
}

export type Input = {
  memoryId: string;
  planId: string;
  userId: string;
};

export type Output = void;
