import { Controller, MysqlDataSource } from "../../../../common";
import { SignInOAuthUseCase } from "../../../application/use-case/sign-in-oauth-use-case";
import { OAuthGoogleGateway } from "../../../infra/gateway/oauth-google-gateway";
import { SessionMysqlRepository } from "../../../infra/repository/mysql/session-mysql-repository";
import { UserMysqlRepository } from "../../../infra/repository/mysql/user-mysql-repository";
import { SignInOAuthController } from "../../../presentation/controller/sign-in-oauth-controller";

export const signInGoogleOAuthControllerFactory = (): Controller => {
  const oAuthGoogleGateway = new OAuthGoogleGateway();
  const manager = MysqlDataSource.getInstance().getQueryRunner().manager;
  const userMysqlRepository = new UserMysqlRepository(manager);
  const sessionRepository = new SessionMysqlRepository(manager);
  const signInOAuthUseCase = new SignInOAuthUseCase(
    oAuthGoogleGateway,
    userMysqlRepository,
    sessionRepository
  );
  const controller = new SignInOAuthController(signInOAuthUseCase);
  return controller;
};
