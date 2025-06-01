import { Controller } from "../../../../common";
import { MediaRegistryMysqlQuery } from "../../../infra/query/mysql/media-registry-mysql-query";
import { ListMediaRegistriesController } from "../../../presentation/controller/list-media-registries-controller";

export const listMediaRegistriesControllerFactory = (): Controller => {
  const mediaRegistryMysqlQuery = new MediaRegistryMysqlQuery();
  const controller = new ListMediaRegistriesController(mediaRegistryMysqlQuery);
  return controller;
};
