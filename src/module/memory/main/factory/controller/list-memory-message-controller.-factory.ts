import { Controller } from "../../../../common";
import { ListMemoryMessageMysqlQuery } from "../../../infra/query/mysql/list-memory-message-mysql-query";
import { ListMemoryMessageController } from "../../../presentation/controller/list-memory-message-controller";

export const listMemoryMessageControllerFactory = (): Controller => {
  const controller = new ListMemoryMessageController(
    new ListMemoryMessageMysqlQuery(),
  );
  return controller;
};
