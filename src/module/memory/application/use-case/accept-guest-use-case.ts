import { UseCase } from "../../../common";
import { ForbiddenError } from "../../error/forbidden-error";
import { UnitOfWorkMemory } from "../contract/unit-of-work-memory";

export class AcceptGuestUseCase implements UseCase<Input, Output> {
  constructor(private readonly unitOfWorkMemory: UnitOfWorkMemory) {}

  async execute(input: Input): Promise<void> {
    const memory = await this.unitOfWorkMemory.execute(({ memoryRepository }) =>
      memoryRepository.getById(input.memoryId)
    );
    if (memory.getUserId() !== input.userId) throw new ForbiddenError();
  }
}

type Input = {
  guestId: string;
  memoryId: string;
  userId: string;
};

type Output = void;
