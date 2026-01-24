import { Controller, MysqlDataSource } from "../../../../common";
import { CreateMemoryMessageUseCase } from "../../../application/use-case/message/create-memory-message-use-case";
import { MemoryMessageMysqlRepository } from "../../../infra/repository/mysql/memory-message-mysql-repository";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";
import { CreateMemoryMessageController } from "../../../presentation/controller/create-memory-message-controller";

export const createMemoryMessageControllerFactory = (): Controller => {
  const manager = MysqlDataSource.getInstance().getQueryRunner().manager;
  const createMemoryMessageUseCase = new CreateMemoryMessageUseCase(
    new MemoryMysqlRepository(manager),
    new MemoryMessageMysqlRepository(manager),
  );
  const controller = new CreateMemoryMessageController(
    createMemoryMessageUseCase,
  );
  return controller;
};
