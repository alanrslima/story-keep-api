import { EventCatalog, NodeEventManager } from "../../../common";
import {
  MemoryCreatedEvent,
  MemoryCreatedEventPayload,
} from "../../application/contract/event/memory-created-event";

export class MemoryCreatedNodeEvent implements MemoryCreatedEvent {
  eventName: EventCatalog = EventCatalog.MEMORY_CREATED;

  private eventManager = NodeEventManager.getInstance();

  async emit(payload: MemoryCreatedEventPayload): Promise<boolean> {
    return this.eventManager.emit(this.eventName, payload);
  }

  async on(
    callback: (payload: MemoryCreatedEventPayload) => void
  ): Promise<void> {
    this.eventManager.on(this.eventName, callback);
  }
}
