import { EventCatalog } from "./event-catalog";

export interface BaseEvent<Payload> {
  eventName: EventCatalog;
  emit(payload: Payload): Promise<boolean>;
  on(callback: (payload: Payload) => void): Promise<void>;
}
