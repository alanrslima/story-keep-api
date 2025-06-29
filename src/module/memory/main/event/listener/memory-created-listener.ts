import { EmailNodemailerGateway, QueueManager } from "../../../../common";
import { SendMemoryGuestInvitationsUseCase } from "../../../application/use-case/send-memory-guest-invitations-use-case";
import { MemoryCreatedNodeEvent } from "../../../infra/event/memory-created-node-event";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";

const sendMemoryGuestInvitations = async (memoryId: string) => {
  try {
    const memoryRepository = new MemoryMysqlRepository();
    const emailGateway = new EmailNodemailerGateway();
    const sendMemoryGuestInvitationsUseCase =
      new SendMemoryGuestInvitationsUseCase(memoryRepository, emailGateway);
    await sendMemoryGuestInvitationsUseCase.execute({
      memoryId,
    });
  } catch (error) {
    console.error("Error to send memory guest invitations", error);
  }
};

export const memoryCreatedListener = () => {
  const memoryCreatedNodeEvent = new MemoryCreatedNodeEvent();

  memoryCreatedNodeEvent.on(async (memory) => {
    QueueManager.getInstance().add(async () =>
      sendMemoryGuestInvitations(memory.id)
    );
  });
};
