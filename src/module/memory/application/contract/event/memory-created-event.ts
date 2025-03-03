import { BaseEvent } from "../../../../common";

export type MemoryCreatedEventPayload = {
  id: string;
};

export interface MemoryCreatedEvent
  extends BaseEvent<MemoryCreatedEventPayload> {}
