import { Controller } from "../../../../common";
import { SignInOpenIdUseCase } from "../../../application/use-case/sign-in-open-id-use-case";
import { OpenIdGoogleGateway } from "../../../infra/gateway/open-id-google-gateway";
import { SignInOpenIdController } from "../../../presentation/controller/sign-in-open-id-controller";

export const signInGoogleControllerFactory = (): Controller => {
  const openIdGateway = OpenIdGoogleGateway.getInstance();
  const signInEmailPasswordUseCase = new SignInOpenIdUseCase(openIdGateway);
  const controller = new SignInOpenIdController(signInEmailPasswordUseCase);
  return controller;
};
