import { UseCase } from "../../../common";
import { ForbiddenError } from "../../error/forbidden-error";
import { MemoryRepository } from "../contract/repository/memory-repository";

export class EditMemoryUseCase implements UseCase<Input, Output> {
  constructor(private readonly memoryRepository: MemoryRepository) {}

  async execute(input: Input): Promise<void> {
    const memory = await this.memoryRepository.getById(input.memoryId);
    if (memory.getUserId() !== input.userId) {
      throw new ForbiddenError();
    }
    if (input.name) memory.setName(input.name);
    if (input.address) memory.setAddress(input.address);
    if (input.startDate) memory.setStartDate(new Date(input.startDate));
    await this.memoryRepository.update(memory);
  }
}

type Input = {
  memoryId: string;
  name?: string;
  address?: string;
  startDate?: string;
  userId: string;
};

type Output = void;
