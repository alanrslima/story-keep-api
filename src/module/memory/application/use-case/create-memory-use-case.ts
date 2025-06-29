import { UseCase } from "../../../common";
import { PaymentGateway } from "../../../payment";
import { Guest } from "../../domain/entity/guest";
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
    private readonly storageGateway: StorageGateway,
    private readonly paymentGateway: PaymentGateway
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
    const guests = input.guests?.map((guest) =>
      Guest.create({ email: guest.email })
    );
    const memory = Memory.create({
      name: input.name,
      startDate: input.startDate ? new Date(input.startDate) : undefined,
      plan,
      userId: input.userId,
      address: input.address,
      coverImage: image,
      isPrivate: input.isPrivate,
      guests,
    });
    let token: string | null = null;
    if (!plan.isFree()) {
      const paymentResponse = await this.paymentGateway.createPaymentIntent({
        amount: plan.calculateFinalPrice(),
        currency: plan.getCurrencyCode(),
        metadata: {
          memoryId: memory.getId(),
        },
      });
      memory.awaitingPayment();
      token = paymentResponse.token;
    } else {
      memory.ready();
    }
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
    return { id: memory.getId(), token };
  }
}

export type Input = {
  name: string;
  startDate: string;
  address: string;
  packageId: string;
  isPrivate: boolean;
  guests?: Array<{ email: string }>;
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
  userId: string;
};

export type Output = { id: string; token: string | null };
