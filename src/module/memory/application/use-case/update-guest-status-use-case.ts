import { UseCase } from "../../../common";
import { UnitOfWorkMemory } from "../contract/unit-of-work-memory";

export class UpdateGuestStatusUseCase implements UseCase<Input, Output> {
  constructor(private readonly unitOfWorkMemory: UnitOfWorkMemory) {}

  async execute(input: Input): Promise<Output> {
    const memory = await this.unitOfWorkMemory.execute(({ memoryRepository }) =>
      memoryRepository.getById(input.memoryId)
    );
    memory.updateGuestStatus(input.guestId, input.status, input.userId);
    await this.unitOfWorkMemory.execute(({ memoryRepository }) =>
      memoryRepository.update(memory)
    );
  }
}

export type Input = {
  memoryId: string;
  userId: string;
  guestId: string;
  status: string;
};

export type Output = void;
