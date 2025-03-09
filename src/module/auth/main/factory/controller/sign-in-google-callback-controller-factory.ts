import { Controller } from "../../../../common";
import { SignInOpenIdCallbackUseCase } from "../../../application/use-case/sign-in-open-id-callback-use-case";
import { OpenIdGoogleGateway } from "../../../infra/gateway/open-id-google-gateway";
import { SessionMysqlRepository } from "../../../infra/repository/mysql/session-mysql-repository";
import { UserMysqlRepository } from "../../../infra/repository/mysql/user-mysql-repository";
import { SignInOpenIdCallbackController } from "../../../presentation/controller/sign-in-open-id-callback-controller";

export const signInGoogleCallbackControllerFactory = (): Controller => {
  const openIdGateway = OpenIdGoogleGateway.getInstance();
  const userRepository = new UserMysqlRepository();
  const sessionRepository = new SessionMysqlRepository();
  const signInEmailPasswordUseCase = new SignInOpenIdCallbackUseCase(
    openIdGateway,
    userRepository,
    sessionRepository
  );
  const controller = new SignInOpenIdCallbackController(
    signInEmailPasswordUseCase
  );
  return controller;
};
