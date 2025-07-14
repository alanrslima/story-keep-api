import { UseCase } from "../../../common";
import { Guest } from "../../domain/entity/guest";
import { MemoryRepository } from "../contract/repository/memory-repository";

export class AddGuestsToMemoryUseCase implements UseCase<Input, Output> {
  constructor(private readonly memoryRepository: MemoryRepository) {}

  async execute(input: Input): Promise<void> {
    const memory = await this.memoryRepository.getById(input.memoryId);
    const guests = input.guests.map((guest) =>
      Guest.create({ email: guest.email })
    );
    memory.addGuests(guests);
    await this.memoryRepository.update(memory);
  }
}

export type Input = {
  memoryId: string;
  guests: Array<{ email: string }>;
};

export type Output = void;
