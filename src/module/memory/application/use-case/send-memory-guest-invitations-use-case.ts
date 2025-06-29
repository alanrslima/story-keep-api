import { EmailGateway, UseCase } from "../../../common";
import { MemoryRepository } from "../contract/repository/memory-repository";

export class SendMemoryGuestInvitationsUseCase
  implements UseCase<Input, Output>
{
  constructor(
    private readonly memoryRepository: MemoryRepository,
    private readonly emailGateway: EmailGateway
  ) {}

  async execute(input: Input): Promise<void> {
    const memory = await this.memoryRepository.getById(input.memoryId);
    const emailsParams = memory.getGuests().map((guest) => ({
      html: "",
      subject: "",
      to: guest.getEmail(),
    }));
    const result = await this.emailGateway.sendMany(emailsParams);
    // result.forEach((resultItem) => {
    //   memory.getGuests().find(guest => guest.getEmail() === resultItem)
    // });
  }
}

export type Input = {
  memoryId: string;
};

export type Output = void;
