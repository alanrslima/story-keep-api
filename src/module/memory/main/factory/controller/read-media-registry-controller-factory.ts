import { Controller } from "../../../../common";
import { ReadMediaRegistryUseCase } from "../../../application/use-case/read-media-registry-use-case";
import { StorageR2Gateway } from "../../../infra/gateway/r2/storage-r2-gateway";
import { MediaRegistryMysqlRepository } from "../../../infra/repository/mysql/media-registry-mysql-repository";
import { ReadMediaRegistryController } from "../../../presentation/controller/read-media-registry-controller";

export const readMediaRegistryControllerFactory = (): Controller => {
  const mediaRegistryRepository = new MediaRegistryMysqlRepository();
  const storageGateway = new StorageR2Gateway();
  const readMediaRegistryUseCase = new ReadMediaRegistryUseCase(
    storageGateway,
    mediaRegistryRepository
  );
  const controller = new ReadMediaRegistryController(readMediaRegistryUseCase);
  return controller;
};
