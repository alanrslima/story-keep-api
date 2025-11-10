import { Controller } from "../../../../common";
import { AutoCompleteUseCase } from "../../../application/use-case/auto-complete-use-case";
import { GeolocationGeoapifyGateway } from "../../../infra/gateway/geolocation-geoapify-gateway";
import { AutoCompleteController } from "../../../presentation/controller/auto-complete-controller";

export const autoCompleteControllerFactory = (): Controller => {
  const geolocationGeoapifyGateway = new GeolocationGeoapifyGateway();
  const autoCompleteUseCase = new AutoCompleteUseCase(
    geolocationGeoapifyGateway
  );
  const controller = new AutoCompleteController(autoCompleteUseCase);
  return controller;
};
