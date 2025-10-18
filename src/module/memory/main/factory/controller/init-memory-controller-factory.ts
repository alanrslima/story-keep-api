import { Controller, MysqlDataSource } from "../../../../common";
import { InitMemoryUseCase } from "../../../application/use-case/init-memory-use-case";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";
import { InitMemoryController } from "../../../presentation/controller/init-memory-controller";

export const initMemoryControllerFactory = (): Controller => {
  const manager = MysqlDataSource.getInstance().getQueryRunner().manager;
  const memoryMysqlRepository = new MemoryMysqlRepository(manager);
  const initMemoryUseCase = new InitMemoryUseCase(memoryMysqlRepository);
  const controller = new InitMemoryController(initMemoryUseCase);
  return controller;
};
