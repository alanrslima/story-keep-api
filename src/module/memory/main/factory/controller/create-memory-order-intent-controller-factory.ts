import { Controller } from "../../../../common";
import { StripePaymentGateway } from "../../../../payment";
import { CreateMemoryOrderIntentUseCase } from "../../../application/use-case/create-memory-order-intent-use-case";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";
import { MemoryOrderMysqlRepository } from "../../../infra/repository/mysql/memory-order-mysql-repository";
import { CreateMemoryOrderIntentController } from "../../../presentation/controller/create-memory-order-intent-controller";

export const createMemoryOrderIntentControllerFactory = (): Controller => {
  const memoryRepository = new MemoryMysqlRepository();
  const paymentGateway = new StripePaymentGateway();
  const MemoryOrderRepository = new MemoryOrderMysqlRepository();
  const createMemoryOrderIntentUseCase = new CreateMemoryOrderIntentUseCase(
    memoryRepository,
    paymentGateway,
    MemoryOrderRepository
  );
  const controller = new CreateMemoryOrderIntentController(
    createMemoryOrderIntentUseCase
  );
  return controller;
};
