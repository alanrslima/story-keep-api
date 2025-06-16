import { Controller } from "../../../../common";
import { EditMemoryUseCase } from "../../../application/use-case/edit-memory-use-case";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";
import { EditMemoryController } from "../../../presentation/controller/edit-memory-controller";

export const editMemoryControllerFactory = (): Controller => {
  const memoryMysqlRepository = new MemoryMysqlRepository();
  const editMemoryUseCase = new EditMemoryUseCase(memoryMysqlRepository);
  const controller = new EditMemoryController(editMemoryUseCase);
  return controller;
};
