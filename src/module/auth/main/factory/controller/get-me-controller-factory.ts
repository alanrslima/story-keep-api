import { Controller } from "../../../../common";
import { GetMeController } from "../../../presentation/controller/get-me-controller";

export const getMeControllerFactory = (): Controller => {
  const controller = new GetMeController();
  return controller;
};
