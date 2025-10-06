import { Controller } from "../../../../common";
import { CompleteFirstLoginUseCase } from "../../../application/use-case/complete-first-login-use-case";
import { UnitOfWorkAuthMysql } from "../../../infra/repository/auth-unit-of-work-mysql";
import { CompleteFirstLoginController } from "../../../presentation/controller/complete-first-login-controller";
import { unityOfWorkAuthRegistry } from "../../config/unit-of-work-auth-mysql-registry";

export const completeFirstLoginControllerFactory = (): Controller => {
  const unitOfWork = new UnitOfWorkAuthMysql(unityOfWorkAuthRegistry);
  const completeFirstLoginUseCase = new CompleteFirstLoginUseCase(unitOfWork);
  const controller = new CompleteFirstLoginController(
    completeFirstLoginUseCase
  );
  return controller;
};
