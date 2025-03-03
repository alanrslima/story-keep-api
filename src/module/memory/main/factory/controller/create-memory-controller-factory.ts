import { Controller } from "../../../../common";
import { CreateMemoryUseCase } from "../../../application/use-case/create-memory-use-case";
import { MemoryCreatedNodeEvent } from "../../../infra/event/memory-created-node-event";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";
import { PlanMysqlRepository } from "../../../infra/repository/mysql/plan-mysql-repository";
import { CreateMemoryController } from "../../../presentation/controller/create-memory-controller";

export const createMemoryControllerFactory = (): Controller => {
  const memoryRepository = new MemoryMysqlRepository();
  const planRepository = new PlanMysqlRepository();
  const memoryCreatedEvent = new MemoryCreatedNodeEvent();
  const createMemoryUseCase = new CreateMemoryUseCase(
    memoryRepository,
    planRepository,
    memoryCreatedEvent
  );
  const controller = new CreateMemoryController(createMemoryUseCase);
  return controller;
};
