import { Controller } from "../../../../common";
import { PlanMysqlQuery } from "../../../infra/query/mysql/plan-mysql-query";
import { ListPlanController } from "../../../presentation/controller/list-plan-controller";

export const listPlanControllerFactory = (): Controller => {
  const planMysqlQuery = new PlanMysqlQuery();
  const controller = new ListPlanController(planMysqlQuery);
  return controller;
};
