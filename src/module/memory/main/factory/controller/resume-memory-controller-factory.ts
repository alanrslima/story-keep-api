import { Controller } from "../../../../common";
import { MemoryMysqlQuery } from "../../../infra/query/mysql/memory-mysql-query";
import { ResumeMemoryController } from "../../../presentation/controller/resume-memory-controller";

export const resumeMemoryControllerFactory = (): Controller => {
  const memoryMysqlQuery = new MemoryMysqlQuery();
  const controller = new ResumeMemoryController(memoryMysqlQuery);
  return controller;
};
