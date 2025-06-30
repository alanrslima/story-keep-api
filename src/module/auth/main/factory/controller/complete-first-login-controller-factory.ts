import { Controller } from "../../../../common";
import { CompleteFirstLoginUseCase } from "../../../application/use-case/complete-first-login-use-case";
import { UserMysqlRepository } from "../../../infra/repository/mysql/user-mysql-repository";
import { CompleteFirstLoginController } from "../../../presentation/controller/complete-first-login-controller";

export const completeFirstLoginControllerFactory = (): Controller => {
  const userRepository = new UserMysqlRepository();
  const completeFirstLoginUseCase = new CompleteFirstLoginUseCase(
    userRepository
  );
  const controller = new CompleteFirstLoginController(
    completeFirstLoginUseCase
  );
  return controller;
};
