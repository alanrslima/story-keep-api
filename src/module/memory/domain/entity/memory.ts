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
  /** produto está sendo criado, mas ainda não foi concluído. */
  DRAFT = "DRAFT",
  /** O cadastro foi concluído, mas o pagamento ainda não foi iniciado ou está aguardando confirmação. */
  PENDING_PAYMENT = "PENDING_PAYMENT",
  /** O usuário iniciou o pagamento (checkout aberto, aguardando retorno do gateway). */
  PAYMENT_IN_PROGRESS = "PAYMENT_IN_PROGRESS",
  /** O produto foi pago e está ativo/publicado. */
  ACTIVE = "ACTIVE",
  /** O produto foi desativado manualmente pelo usuário ou pelo sistema. */
  INACTIVE = "INACTIVE",
  /** O produto foi suspenso por violação de política ou falha no pagamento recorrente. */
  SUSPENDED = "SUSPENDED",
  /** Produto arquivado permanentemente (sem exibição pública). */
  ARCHIVED = "ARCHIVED",
  /** Produto removido logicamente (soft delete). */
  DELETED = "DELETED",
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
  private guests: Array<Guest> = [];

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
    this.guests = props.guests || [];
    this.isPrivate = props.isPrivate;
  }

  static create(props: CreateProps) {
    return new Memory({
      ...props,
      id: new ID().getValue(),
      status: MemoryStatus.DRAFT,
      videosCount: 0,
      photosCount: 0,
    });
  }

  static build(props: BuildProps) {
    return new Memory(props);
  }

  addGuests(guests: Array<Guest>) {
    for (const guest of guests) {
      if (!this.guests.map((i) => i.getEmail()).includes(guest.getEmail())) {
        this.guests.push(guest);
      }
    }
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

  getGuests(): Guest[] {
    return this.guests;
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

  setCoverImage(coverImage: Image) {
    this.coverImage = coverImage;
  }

  confirmPayment(plan: Plan) {
    this.plan = plan;
    this.status = MemoryStatus.ACTIVE;
  }

  pendingPayment() {
    this.status = MemoryStatus.PENDING_PAYMENT;
  }

  paymentInProgress() {
    this.status = MemoryStatus.PAYMENT_IN_PROGRESS;
  }

  suspended() {
    this.status = MemoryStatus.SUSPENDED;
  }

  archived() {
    this.status = MemoryStatus.ARCHIVED;
  }

  deleted() {
    this.status = MemoryStatus.DELETED;
  }

  createMediaRegistry(
    mimetype: string,
    size: number,
    personaId: string
  ): MediaRegistry {
    if (this.isFull(mimetype)) throw new LimitMediaRegistryError();
    if (!this.isActive()) throw new MemoryNotReadyError();
    const mediaRegistry = MediaRegistry.create({
      memoryId: this.id.getValue(),
      mimetype,
      size,
      personaId,
    });
    this.updateRegistryCounter(mediaRegistry);
    return mediaRegistry;
  }

  private isActive() {
    return this.status === MemoryStatus.ACTIVE;
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
