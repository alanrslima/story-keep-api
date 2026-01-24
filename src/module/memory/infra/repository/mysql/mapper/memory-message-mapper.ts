import { MemoryMessage } from "../../../../domain/entity/memory-message";

export type MemoryMessageRow = {
  id: string;
  user_id: string;
  memory_id: string;
  message: string;
};

export class MemoryMessageMapper {
  static toPersistence(input: MemoryMessage): MemoryMessageRow {
    return {
      id: input.getId().getValue(),
      memory_id: input.getMemoryId().getValue(),
      message: input.getMessage().getValue(),
      user_id: input.getUserId().getValue(),
    };
  }

  static toEntity(input: MemoryMessageRow): MemoryMessage {
    return MemoryMessage.build({
      id: input.id,
      memoryId: input.memory_id,
      message: input.message,
      userId: input.user_id,
    });
  }
}
