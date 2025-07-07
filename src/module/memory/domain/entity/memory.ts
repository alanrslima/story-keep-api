import { ID } from "../../../common";
import { LimitMediaRegistryError } from "../../error/limit-media-registry-error";
import { MemoryNotReadyError } from "../../error/memory-not-ready-error";
import { Mimetype } from "../value-object/mimetype";
import { Guest } from "./guest";
import { Image } from "./image";
import { MediaRegistry } from "./media-registry";
import { Plan } from "./plan";

type CreateProps = {
  name?: string;
  startDate?: Date;
  plan?: Plan;
  userId: string;
  address?: string;
  coverImage?: Image;
  isPrivate?: boolean;
  guests?: Array<Guest>;
};

type BuildProps = CreateProps & {
  id: string;
  status: MemoryStatus;
  photosCount: number;
  videosCount: number;
};

export enum MemoryStatus {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  READY = "READY",
}

export class Memory {
  private id: ID;
  private name?: string;
  private startDate?: Date;
  private plan?: Plan;
  private userId: string;
  private address?: string;
  private coverImage?: Image;
  private status: MemoryStatus;
  private photosCount: number;
  private videosCount: number;
  private isPrivate?: boolean;
  private guests?: Array<Guest>;

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
    this.guests = props.guests;
    this.isPrivate = props.isPrivate;
  }

  static create(props: CreateProps) {
    return new Memory({
      ...props,
      id: new ID().getValue(),
      status: MemoryStatus.PENDING,
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

  getName(): string | undefined {
    return this.name;
  }

  getStatus() {
    return this.status;
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

  getPlan(): Plan | undefined {
    return this.plan;
  }

  getUserId(): string {
    return this.userId;
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

  selectPlan(plan: Plan) {
    this.plan = plan;
  }

  awaitingPayment() {
    // this.status = MemoryStatus.AWAITING_PAYMENT;
  }

  setCoverImage(coverImage: Image) {
    this.coverImage = coverImage;
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
    if (!this.plan) throw new Error("Plan not selected");
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
