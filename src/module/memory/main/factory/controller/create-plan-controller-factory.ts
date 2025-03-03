import { Controller } from "../../../../common";
import { CreatePlanUseCase } from "../../../application/use-case/create-plan-use-case";
import { PlanMysqlRepository } from "../../../infra/repository/mysql/plan-mysql-repository";
import { CreatePlanController } from "../../../presentation/controller/create-plan-controller";

export const createPlanControllerFactory = (): Controller => {
  const planRepository = new PlanMysqlRepository();
  const createPlanUseCase = new CreatePlanUseCase(planRepository);
  const controller = new CreatePlanController(createPlanUseCase);
  return controller;
};
