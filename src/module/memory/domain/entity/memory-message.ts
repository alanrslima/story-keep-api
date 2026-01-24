import { ID } from "../../../common";
import { Message } from "../value-object/message";

type MemoryMessageCreate = {
  memoryId: string;
  userId: string;
  message: string;
};

type MemoryMessageBuild = MemoryMessageCreate & { id: string };

export class MemoryMessage {
  private id: ID;
  private memoryId: ID;
  private userId: ID;
  private message: Message;

  private constructor(props: MemoryMessageBuild) {
    this.id = new ID(props.id);
    this.memoryId = new ID(props.memoryId);
    this.userId = new ID(props.userId);
    this.message = new Message(props.message);
  }

  static create(props: MemoryMessageCreate): MemoryMessage {
    return new MemoryMessage({ ...props, id: new ID().getValue() });
  }

  static build(props: MemoryMessageBuild): MemoryMessage {
    return new MemoryMessage(props);
  }

  getId(): ID {
    return this.id;
  }

  getUserId(): ID {
    return this.userId;
  }

  getMemoryId(): ID {
    return this.memoryId;
  }

  getMessage(): Message {
    return this.message;
  }
}
