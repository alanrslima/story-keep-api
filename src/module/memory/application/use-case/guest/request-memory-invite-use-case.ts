import { UseCase } from "../../../../common";
import { UnitOfWorkMemory } from "../../contract/unit-of-work-memory";

/** @description Destinado a um convidado que solicita acesso de participante em um baú de memórias atraves do link de acesso */
export class RequestMemoryInviteUseCase implements UseCase<Input, Output> {
  constructor(private readonly unitOfWorkMemory: UnitOfWorkMemory) {}

  async execute(input: Input): Promise<Output> {
    const memory = await this.unitOfWorkMemory.execute(({ memoryRepository }) =>
      memoryRepository.getById(input.memoryId)
    );
    memory.inviteUser(input.userId);
    await this.unitOfWorkMemory.execute(({ memoryRepository }) =>
      memoryRepository.update(memory)
    );
  }
}

export type Input = {
  userId: string;
  memoryId: string;
};

export type Output = void;
