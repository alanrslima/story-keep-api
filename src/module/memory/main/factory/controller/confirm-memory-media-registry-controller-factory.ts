import { Controller } from "../../../../common";
import { ConfirmMemoryMediaRegistryUseCase } from "../../../application/use-case/confirm-memory-media-registry-use-case";
import { MediaRegistryMysqlRepository } from "../../../infra/repository/mysql/media-registry-mysql-repository";
import { ConfirmMemoryMediaRegistryController } from "../../../presentation/controller/confirm-memory-media-registry-controller";

export const confirmMemoryMediaRegistryControllerFactory = (): Controller => {
  const mediaRegistryRepository = new MediaRegistryMysqlRepository();
  const confirmMemoryMediaRegistryUseCase =
    new ConfirmMemoryMediaRegistryUseCase(mediaRegistryRepository);
  const controller = new ConfirmMemoryMediaRegistryController(
    confirmMemoryMediaRegistryUseCase
  );
  return controller;
};
