import { Controller } from "../../../../common";
import { CreateMemoryUseCase } from "../../../application/use-case/create-memory-use-case";
import { MemoryMemoryRepository } from "../../../infra/repository/memory/memory-memory-repository";
import { PlanMemoryRepository } from "../../../infra/repository/memory/plan-memory-repository";
import { CreateMemoryController } from "../../../presentation/controller/create-memory-controller";

export const createMemoryControllerFactory = (): Controller => {
  const memoryRepository = new MemoryMemoryRepository();
  const planRepository = new PlanMemoryRepository();
  const createMemoryUseCase = new CreateMemoryUseCase(
    memoryRepository,
    planRepository
  );
  const controller = new CreateMemoryController(createMemoryUseCase);
  return controller;
};
