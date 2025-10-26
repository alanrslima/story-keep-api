import { Controller } from "../../../../common";
import { MemoryMysqlQuery } from "../../../infra/query/mysql/memory-mysql-query";
import { GetGuestController } from "../../../presentation/controller/get-guest-controller";

export const getGuestControllerFactory = (): Controller => {
  const memoryMysqlQuery = new MemoryMysqlQuery();
  const controller = new GetGuestController(memoryMysqlQuery);
  return controller;
};
