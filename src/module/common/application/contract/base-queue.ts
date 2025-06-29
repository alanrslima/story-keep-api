export interface BaseQueue {
  add(fn: () => Promise<void>): Promise<void>;
}
