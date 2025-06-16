import { ID } from "../../../common";
import { LimitMediaRegistryError } from "../../error/limit-media-registry-error";
import { MemoryNotReadyError } from "../../error/memory-not-ready-error";
import { Mimetype } from "../value-object/mimetype";
import { Image } from "./image";
import { MediaRegistry } from "./media-registry";
import { Plan } from "./plan";

type CreateProps = {
  name: string;
  startDate?: Date;
  plan: Plan;
  userId: string;
  address?: string;
  coverImage?: Image;
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
  PAYMENT_FAILED = "payment_failed",
  CANCELED = "canceled",
  READY = "ready",
}

export class Memory {
  private id: ID;
  private name: string;
  private startDate?: Date;
  private plan: Plan;
  private userId: string;
  private address?: string;
  private coverImage?: Image;
  private status: MemoryStatus;
  private photosCount: number;
  private videosCount: number;

  private constructor(props: BuildProps) {
    this.id = new ID(props.id);
    this.name = props.name;
    this.plan = props.plan;
    this.startDate = props.startDate;
    this.userId = props.userId;
    this.status = props.status;
    this.photosCount = props.photosCount;
    this.videosCount = props.videosCount;
    this.address = props.address;
    this.coverImage = props.coverImage;
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

  setName(name: string) {
    this.name = name;
  }

  getStartDate(): Date | undefined {
    return this.startDate;
  }

  setAddress(address: string) {
    this.address = address;
  }

  setStartDate(startDate: Date) {
    this.startDate = startDate;
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

  getCoverImageName(): string | undefined {
    return this.coverImage?.getName();
  }

  getAddress(): string | undefined {
    return this.address;
  }

  updateRegistryCounter(registry: MediaRegistry) {
    if (registry.isPhoto()) {
      this.photosCount += 1;
    } else if (registry.isVideo()) {
      this.videosCount += 1;
    }
  }

  awaitingPayment() {
    this.status = MemoryStatus.AWAITING_PAYMENT;
  }

  ready() {
    this.status = MemoryStatus.READY;
  }

  createMediaRegistry(
    mimetype: string,
    size: number,
    personaId: string
  ): MediaRegistry {
    if (this.isFull(mimetype)) throw new LimitMediaRegistryError();
    if (!this.isReady()) throw new MemoryNotReadyError();
    const mediaRegistry = MediaRegistry.create({
      memoryId: this.id.getValue(),
      mimetype,
      size,
      personaId,
    });
    this.updateRegistryCounter(mediaRegistry);
    return mediaRegistry;
  }

  private isReady() {
    return this.status === MemoryStatus.READY;
  }

  private isFull(mimetype: string): boolean {
    const type = new Mimetype(mimetype);
    if (type.isPhoto()) {
      if (this.plan.getPhotosLimit() === undefined) return false;
      return this.photosCount > this.plan.getPhotosLimit()!;
    } else if (type.isVideo()) {
      if (this.plan.getVideosLimit() === undefined) return false;
      return this.videosCount > this.plan.getVideosLimit()!;
    }
    return true;
  }
}
