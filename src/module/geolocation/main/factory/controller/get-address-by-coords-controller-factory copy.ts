import { Controller } from "../../../../common";
import { GetAddressByCoordsUseCase } from "../../../application/use-case/get-address-by-coords-use-case";
import { GeolocationGeoapifyGateway } from "../../../infra/gateway/geolocation-geoapify-gateway";
import { getAddressByCoordsController } from "../../../presentation/controller/get-address-by-coords-controller";

export const getAddressByCoordsControllerFactory = (): Controller => {
  const geolocationGeoapifyGateway = new GeolocationGeoapifyGateway();
  const autoCompleteUseCase = new GetAddressByCoordsUseCase(
    geolocationGeoapifyGateway
  );
  const controller = new getAddressByCoordsController(autoCompleteUseCase);
  return controller;
};
