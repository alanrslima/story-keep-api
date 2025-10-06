import { Controller } from "../../../../common";
import { SignUpUseCase } from "../../../application/use-case/sign-up-use-case";
import { UnitOfWorkAuthMysql } from "../../../infra/repository/auth-unit-of-work-mysql";
import { SignUpController } from "../../../presentation/controller/sign-up-controller";
import { unityOfWorkAuthRegistry } from "../../config/unit-of-work-auth-mysql-registry";

export const signUpControllerFactory = (): Controller => {
  const unitOfWork = new UnitOfWorkAuthMysql(unityOfWorkAuthRegistry);
  const signUpUseCase = new SignUpUseCase(unitOfWork);
  const controller = new SignUpController(signUpUseCase);
  return controller;
};
