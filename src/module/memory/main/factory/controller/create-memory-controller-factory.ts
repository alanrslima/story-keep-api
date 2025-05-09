import { Controller } from "../../../../common";
import { StripePaymentGateway } from "../../../../payment";
import { CreateMemoryUseCase } from "../../../application/use-case/create-memory-use-case";
import { MemoryCreatedNodeEvent } from "../../../infra/event/memory-created-node-event";
import { StorageR2Gateway } from "../../../infra/gateway/r2/storage-r2-gateway";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";
import { PlanMysqlRepository } from "../../../infra/repository/mysql/plan-mysql-repository";
import { CreateMemoryController } from "../../../presentation/controller/create-memory-controller";

export const createMemoryControllerFactory = (): Controller => {
  const memoryRepository = new MemoryMysqlRepository();
  const planRepository = new PlanMysqlRepository();
  const memoryCreatedEvent = new MemoryCreatedNodeEvent();
  const storageR2Gateway = new StorageR2Gateway();
  const stripePaymentGateway = new StripePaymentGateway();
  const createMemoryUseCase = new CreateMemoryUseCase(
    memoryRepository,
    planRepository,
    memoryCreatedEvent,
    storageR2Gateway,
    stripePaymentGateway
  );
  const controller = new CreateMemoryController(createMemoryUseCase);
  return controller;
};
