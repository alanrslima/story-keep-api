import { UseCase } from "../../../../common";
import { MemoryMessage } from "../../../domain/entity/memory-message";
import { ForbiddenError } from "../../../error/forbidden-error";
import { MemoryMessageRepository } from "../../contract/repository/memory-message-repository";
import { MemoryRepository } from "../../contract/repository/memory-repository";

export class CreateMemoryMessageUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly memoryRepository: MemoryRepository,
    private readonly memoryMessageRepository: MemoryMessageRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const memory = await this.memoryRepository.getById(input.memoryId);
    if (!memory.canAccess(input.userId)) throw new ForbiddenError();
    const memoryMesage = MemoryMessage.create({
      memoryId: input.memoryId,
      message: input.message,
      userId: input.userId,
    });
    await this.memoryMessageRepository.create(memoryMesage);
  }
}

export type Input = {
  userId: string;
  message: string;
  memoryId: string;
};

export type Output = void;
