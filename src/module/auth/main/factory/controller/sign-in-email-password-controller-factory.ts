import { Controller } from "../../../../common";
import { SignInEmailPasswordUseCase } from "../../../application/use-case/sign-in-email-password-use-case";
import { SessionMysqlRepository } from "../../../infra/repository/mysql/session-mysql-repository";
import { UserMysqlRepository } from "../../../infra/repository/mysql/user-mysql-repository";
import { SignInEmailPasswordController } from "../../../presentation/controller/sign-in-email-password-controller";

export const signInEmailPasswordControllerFactory = (): Controller => {
  const userRepository = new UserMysqlRepository();
  const sessionRepository = new SessionMysqlRepository();
  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    userRepository,
    sessionRepository
  );
  const controller = new SignInEmailPasswordController(
    signInEmailPasswordUseCase
  );
  return controller;
};
