import { UseCase } from "../../../common";
import { Memory } from "../../domain/entity/memory";
import { MemoryCreatedEvent } from "../contract/event/memory-created-event";
import { MemoryRepository } from "../contract/repository/memory-repository";
import { PlanRepository } from "../contract/repository/plan-repository";

export class CreateMemoryUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly memoryRepository: MemoryRepository,
    private readonly planRepository: PlanRepository,
    private readonly memoryCreatedEvent: MemoryCreatedEvent
  ) {}

  async execute(input: Input): Promise<Output> {
    const plan = await this.planRepository.getById(input.packageId);
    const memory = Memory.create({
      name: input.name,
      date: input.date,
      plan,
      userId: input.session.user.id,
    });
    await this.memoryRepository.create(memory);
    this.memoryCreatedEvent.emit({ id: memory.getId() });
    return { id: memory.getId() };
  }
}

export type Input = {
  name: string;
  date: Date;
  address: string;
  packageId: string;
  session: {
    user: { id: string };
  };
};

export type Output = { id: string };
