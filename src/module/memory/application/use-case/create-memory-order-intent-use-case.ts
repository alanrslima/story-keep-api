import { UseCase } from "../../../common";
import { PaymentGateway } from "../../../payment";
import { MemoryOrder } from "../../domain/entity/memory-order";
import { ForbiddenError } from "../../error/forbidden-error";
import { MemoryOrderRepository } from "../contract/repository/memory-order-repository";
import { MemoryRepository } from "../contract/repository/memory-repository";

export class CreateMemoryOrderIntentUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly memoryRepository: MemoryRepository,
    private readonly paymentGateway: PaymentGateway,
    private readonly memoryOrderRepository: MemoryOrderRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const memory = await this.memoryRepository.getById(input.memoryId);
    if (memory.getUserId() !== input.userId) throw new ForbiddenError();
    const plan = memory.getPlan();
    if (!plan) throw new Error("No plan selected at the memory");
    const memoryOrder = MemoryOrder.create({
      memoryId: memory.getId(),
      userId: input.userId,
    });
    const { token } = await this.paymentGateway.createPaymentIntent({
      amount: plan.calculateFinalPrice(),
      currency: plan.getCurrencyCode(),
      metadata: {
        memoryId: memory.getId(),
        orderId: memoryOrder.getId(),
      },
    });
    await this.memoryOrderRepository.create(memoryOrder);
    return { token };
  }
}

export type Input = { memoryId: string; userId: string };

export type Output = {
  token: string | null;
};
