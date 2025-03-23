import { Controller } from "../../../../common";
import { MemoryMysqlQuery } from "../../../infra/query/mysql/memory-mysql-query";
import { ListMemoryController } from "../../../presentation/controller/list-memory-controller";

export const listMemoryControllerFactory = (): Controller => {
  const memoryMysqlQuery = new MemoryMysqlQuery();
  const controller = new ListMemoryController(memoryMysqlQuery);
  return controller;
};
