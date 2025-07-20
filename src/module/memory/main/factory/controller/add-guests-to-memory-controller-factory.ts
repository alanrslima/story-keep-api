import { Controller } from "../../../../common";
import { AddGuestsToMemoryUseCase } from "../../../application/use-case/add-guests-to-memory-use-case";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";
import { AddGuestsToMemoryController } from "../../../presentation/controller/add-guests-to-memory-controller";

export const addGuestsToMemoryControllerFactory = (): Controller => {
  const memoryRepository = new MemoryMysqlRepository();
  const addGuestsToMemoryUseCase = new AddGuestsToMemoryUseCase(
    memoryRepository
  );
  const controller = new AddGuestsToMemoryController(addGuestsToMemoryUseCase);
  return controller;
};
