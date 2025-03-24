import { ID } from "../../../common";
import { InvalidFilenameMediaRegistryError } from "../../error/invalid-filename-media-registry-error";
import { InvalidPersonaMediaRegistryError } from "../../error/invalid-persona-media-registry-error";
import { Mimetype } from "../value-object/mimetype";
import { Memory } from "./memory";

type CreateProps = {
  memoryId: string;
  personaId: string;
  mimetype: string;
  size: number;
};

type BuildProps = CreateProps & {
  id: string;
  url?: string;
  status: MediaRegistryStatus;
  createdAt: Date;
  filename: string;
};

export enum MediaRegistryStatus {
  CREATED = "created",
  CANCELED = "canceled",
  READY = "ready",
}

export class MediaRegistry {
  private id: ID;
  private memoryId: ID;
  private personaId: ID;
  private filename: string;
  private mimetype: Mimetype;
  private url?: string;
  private status: MediaRegistryStatus;
  private createdAt: Date;
  private size: number;

  private constructor(props: BuildProps) {
    this.id = new ID(props.id);
    this.memoryId = new ID(props.memoryId);
    this.personaId = new ID(props.personaId);
    this.filename = props.filename;
    this.url = props.url;
    this.status = props.status;
    this.mimetype = new Mimetype(props.mimetype);
    this.createdAt = props.createdAt;
    this.size = props.size;
  }

  static create(props: CreateProps) {
    return new MediaRegistry({
      ...props,
      id: new ID().getValue(),
      status: MediaRegistryStatus.CREATED,
      createdAt: new Date(),
      filename: MediaRegistry.generateFilename(new Mimetype(props.mimetype)),
    });
  }

  static build(props: BuildProps) {
    return new MediaRegistry(props);
  }

  getId(): string {
    return this.id.getValue();
  }

  getSize(): number {
    return this.size;
  }

  getMemoryId(): string {
    return this.memoryId.getValue();
  }

  getPersonaId(): string {
    return this.personaId.getValue();
  }

  getFilename(): string {
    return this.filename;
  }

  getStatus(): string {
    return this.status;
  }

  getUrl(): string | undefined {
    return this.url;
  }

  getMimetype(): string {
    return this.mimetype.getValue();
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  private generateUrl() {
    return `.../${this.filename}`;
  }

  private static generateFilename(mimetype: Mimetype) {
    return new ID().getValue() + "." + mimetype.getExtension();
  }

  isPhoto(): boolean {
    return this.mimetype.isPhoto();
  }

  isVideo(): boolean {
    return this.mimetype.isVideo();
  }

  confirm(personaId: string, filename: string) {
    if (personaId !== this.personaId.getValue()) {
      throw new InvalidPersonaMediaRegistryError();
    }
    if (filename !== this.filename) {
      throw new InvalidFilenameMediaRegistryError();
    }
    this.url = this.generateUrl();
    this.status = MediaRegistryStatus.READY;
  }
}
