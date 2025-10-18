import { Controller } from "../../../../common";
import { SignInEmailPasswordUseCase } from "../../../application/use-case/sign-in-email-password-use-case";
import { UnitOfWorkAuthMysql } from "../../../infra/repository/auth-unit-of-work-mysql";
import { SignInEmailPasswordController } from "../../../presentation/controller/sign-in-email-password-controller";
import { unityOfWorkAuthRegistry } from "../../config/unit-of-work-auth-mysql-registry";

export const signInEmailPasswordControllerFactory = (): Controller => {
  const signInEmailPasswordUseCase = new SignInEmailPasswordUseCase(
    new UnitOfWorkAuthMysql(unityOfWorkAuthRegistry)
  );
  const controller = new SignInEmailPasswordController(
    signInEmailPasswordUseCase
  );
  return controller;
};
