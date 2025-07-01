import { UseCase } from "../../../common";
import {
  CouponRepository,
  MemoryOrder,
  PaymentGateway,
} from "../../../payment";
import { Coupon } from "../../../payment/domain/entity/coupon";
import { Guest } from "../../domain/entity/guest";
import { Image } from "../../domain/entity/image";
import { Memory } from "../../domain/entity/memory";
import { MemoryCreatedEvent } from "../contract/event/memory-created-event";
import { StorageGateway } from "../contract/gateway/storage-gateway";
import { MemoryRepository } from "../contract/repository/memory-repository";
import { PlanRepository } from "../contract/repository/plan-repository";

export class OrderMemoryUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly memoryRepository: MemoryRepository,
    private readonly planRepository: PlanRepository,
    private readonly memoryCreatedEvent: MemoryCreatedEvent,
    private readonly storageGateway: StorageGateway,
    private readonly paymentGateway: PaymentGateway,
    private readonly couponRepository: CouponRepository
  ) {}

  private async findCouponIfExists(
    couponId?: string
  ): Promise<Coupon | undefined> {
    if (!couponId) return undefined;
    return this.couponRepository.findById(couponId);
  }

  async execute(input: Input): Promise<Output> {
    const memory = await this.memoryRepository.getById(input.memoryId);
    if (memory.getUserId() !== input.userId) {
      throw new Error("User does not have permission to order this memory");
    }
    const coupon = await this.findCouponIfExists(input.couponId);
    const order = MemoryOrder.create({
      memoryId: memory.getId(),
      priceCents: memory.getPlan().getPriceCents(),
      userId: input.userId,
    });
    if (coupon) {
      order.applyCoupon(coupon);
    }

    // const memory = await this.createMemory(input);
    // const order = MemoryOrder.create({
    //   memoryId: memory.getId(),
    //   priceOriginal: memory.getPlan().getPriceCents(),
    // });
    // if (input.couponCode) {
    // }

    // let token: string | null = null;
    // if (!plan.isFree()) {
    //   const paymentResponse = await this.paymentGateway.createPaymentIntent({
    //     amount: plan.calculateFinalPrice(),
    //     currency: plan.getCurrencyCode(),
    //     metadata: {
    //       memoryId: memory.getId(),
    //     },
    //   });
    //   memory.awaitingPayment();
    //   token = paymentResponse.token;
    // } else {
    //   memory.ready();
    // }
    // await this.memoryRepository.create(memory);
    // if (input.file) {
    //   const image = Image.create({
    //     mimetype: input.file.mimetype,
    //     size: input.file.size,
    //     buffer: input.file.buffer,
    //   });
    //   await this.storageGateway.upload(image);
    // }
    // this.memoryCreatedEvent.emit({ id: memory.getId() });
    return { id: memory.getId(), token: "" };
  }
}

export type Input = {
  memoryId: string;
  userId: string;
  couponId?: string;
};

export type Output = { id: string; token: string | null };
