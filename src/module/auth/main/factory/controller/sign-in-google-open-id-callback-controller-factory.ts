import { Controller } from "../../../../common";
import { SignInOpenIdCallbackUseCase } from "../../../application/use-case/sign-in-open-id-callback-use-case";
import { OpenIdGoogleGateway } from "../../../infra/gateway/open-id-google-gateway";
import { UnitOfWorkAuthMysql } from "../../../infra/repository/auth-unit-of-work-mysql";
import { SignInOpenIdCallbackController } from "../../../presentation/controller/sign-in-open-id-callback-controller";
import { unityOfWorkAuthRegistry } from "../../config/unit-of-work-auth-mysql-registry";

export const signInGoogleOpenIdCallbackControllerFactory = (): Controller => {
  const openIdGoogleGateway = new OpenIdGoogleGateway();
  const signInOpenIdCallbackUseCase = new SignInOpenIdCallbackUseCase(
    openIdGoogleGateway,
    new UnitOfWorkAuthMysql(unityOfWorkAuthRegistry)
  );
  const controller = new SignInOpenIdCallbackController(
    signInOpenIdCallbackUseCase
  );
  return controller;
};
