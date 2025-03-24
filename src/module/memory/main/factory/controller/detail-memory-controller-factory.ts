import { Controller } from "../../../../common";
import { MemoryMysqlQuery } from "../../../infra/query/mysql/memory-mysql-query";
import { DetailMemoryController } from "../../../presentation/controller/detail-memory-controller";

export const detailMemoryControllerFactory = (): Controller => {
  const memoryMysqlQuery = new MemoryMysqlQuery();
  const controller = new DetailMemoryController(memoryMysqlQuery);
  return controller;
};
