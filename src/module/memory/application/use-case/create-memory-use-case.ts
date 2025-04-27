import { UseCase } from "../../../common";
import { Image } from "../../domain/entity/image";
import { Memory } from "../../domain/entity/memory";
import { MemoryCreatedEvent } from "../contract/event/memory-created-event";
import { StorageGateway } from "../contract/gateway/storage-gateway";
import { MemoryRepository } from "../contract/repository/memory-repository";
import { PlanRepository } from "../contract/repository/plan-repository";

export class CreateMemoryUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly memoryRepository: MemoryRepository,
    private readonly planRepository: PlanRepository,
    private readonly memoryCreatedEvent: MemoryCreatedEvent,
    private readonly storageGateway: StorageGateway
  ) {}

  async execute(input: Input): Promise<Output> {
    const plan = await this.planRepository.getById(input.packageId);
    let image: Image | undefined = undefined;
    if (input.file) {
      image = Image.create({
        mimetype: input.file.mimetype,
        size: input.file.size,
        buffer: input.file.buffer,
      });
      await this.storageGateway.upload(image);
    }
    const memory = Memory.create({
      name: input.name,
      startDate: input.startDate ? new Date(input.startDate) : undefined,
      plan,
      userId: input.session.user.id,
      address: input.address,
      coverImage: image,
    });
    await this.memoryRepository.create(memory);
    if (input.file) {
      const image = Image.create({
        mimetype: input.file.mimetype,
        size: input.file.size,
        buffer: input.file.buffer,
      });
      await this.storageGateway.upload(image);
    }
    this.memoryCreatedEvent.emit({ id: memory.getId() });
    return { id: memory.getId() };
  }
}

export type Input = {
  name: string;
  startDate: string;
  address: string;
  packageId: string;
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
  session: {
    user: { id: string };
  };
};

export type Output = { id: string };
