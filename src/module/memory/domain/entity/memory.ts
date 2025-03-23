import { ID } from "../../../common";
import { Mimetype } from "../value-object/mimetype";
import { MediaRegistry } from "./media-registry";
import { Plan } from "./plan";

type CreateProps = {
  name: string;
  date: Date;
  plan: Plan;
  userId: string;
};

type BuildProps = CreateProps & {
  id: string;
  status: MemoryStatus;
  photosCount: number;
  videosCount: number;
};

export enum MemoryStatus {
  CREATED = "created",
  AWAITING_PAYMENT = "awaiting_payment",
  PAID = "paid",
  FAILED = "failed",
  CANCELED = "canceled",
  READY = "ready",
}

export class Memory {
  private id: ID;
  private name: string;
  private date: Date;
  private plan: Plan;
  private userId: string;
  private status: MemoryStatus;
  private photosCount: number;
  private videosCount: number;

  private constructor(props: BuildProps) {
    this.id = new ID(props.id);
    this.name = props.name;
    this.plan = props.plan;
    this.date = props.date;
    this.userId = props.userId;
    this.status = props.status;
    this.photosCount = props.photosCount;
    this.videosCount = props.videosCount;
  }

  static create(props: CreateProps) {
    return new Memory({
      ...props,
      id: new ID().getValue(),
      status: MemoryStatus.CREATED,
      videosCount: 0,
      photosCount: 0,
    });
  }

  static build(props: BuildProps) {
    return new Memory(props);
  }

  getId(): string {
    return this.id.getValue();
  }

  getName(): string {
    return this.name;
  }

  getDate(): Date {
    return this.date;
  }

  getPlan(): Plan {
    return this.plan;
  }

  getUserId(): string {
    return this.userId;
  }

  getStatus() {
    return this.status;
  }

  getPhotosCount() {
    return this.photosCount;
  }

  getVideosCount() {
    return this.videosCount;
  }

  updateRegistryCounter(registry: MediaRegistry) {
    if (registry.isPhoto()) {
      this.photosCount += 1;
    } else if (registry.isVideo()) {
      this.videosCount += 1;
    }
  }

  canAddRegistry(mimetype: string): boolean {
    const type = new Mimetype(mimetype);
    if (type.isPhoto()) {
      if (this.plan.getPhotosLimit() === undefined) return true;
      return this.photosCount < this.plan.getPhotosLimit()!;
    } else if (type.isVideo()) {
      if (this.plan.getVideosLimit() === undefined) return true;
      return this.videosCount < this.plan.getVideosLimit()!;
    }
    return false;
  }
}
