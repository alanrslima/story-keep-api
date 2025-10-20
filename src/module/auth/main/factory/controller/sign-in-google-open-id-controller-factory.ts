import { Controller } from "../../../../common";
import { SignInOpenIdUseCase } from "../../../application/use-case/sign-in-open-id-use-case";
import { OpenIdGoogleGateway } from "../../../infra/gateway/open-id-google-gateway";
import { SignInOpenIdController } from "../../../presentation/controller/sign-in-open-id-controller";

export const signInGoogleOpenIdControllerFactory = (): Controller => {
  const openIdGoogleGateway = new OpenIdGoogleGateway();
  const signInOpenIdUseCase = new SignInOpenIdUseCase(openIdGoogleGateway);
  const controller = new SignInOpenIdController(signInOpenIdUseCase);
  return controller;
};
