import { Memory } from "../../domain/entity/memory";
import { MemoryRepository } from "../contract/repository/memory-repository";
import { PlanRepository } from "../contract/repository/plan-repository";
import { UseCase } from "../contract/use-case";

export class CreateMemoryUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly memoryRepository: MemoryRepository,
    private readonly planRepository: PlanRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const plan = await this.planRepository.getById(input.packageId);
    const memory = Memory.create({
      name: input.name,
      date: input.date,
      plan,
      userId: input.user.id,
    });
    await this.memoryRepository.create(memory);
    return { id: memory.getId() };
  }
}

export type Input = {
  name: string;
  date: Date;
  location: string;
  packageId: string;
  user: {
    id: string;
  };
};

export type Output = { id: string };
