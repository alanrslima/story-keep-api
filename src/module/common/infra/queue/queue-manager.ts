import Bottleneck from "bottleneck";
import { BaseQueue } from "../../application/contract/base-queue";

export class QueueManager implements BaseQueue {
  private queue: Bottleneck;

  private static instance: QueueManager;

  private constructor() {
    this.queue = new Bottleneck({
      maxConcurrent: 2,
      minTime: 100,
    });
  }

  async add(fn: () => Promise<void>): Promise<void> {
    await this.queue.schedule(fn);
  }

  public static getInstance(): QueueManager {
    if (!QueueManager.instance) {
      QueueManager.instance = new QueueManager();
    }
    return QueueManager.instance;
  }
}
