export interface BaseEvent<Payload> {
  eventName: string;
  emit(payload: Payload): Promise<boolean>;
  on(callback: (payload: Payload) => void): Promise<void>;
}
