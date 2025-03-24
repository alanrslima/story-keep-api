import { Controller } from "../../../../common";
import { InitMemoryMediaRegistryUseCase } from "../../../application/use-case/init-memory-media-registry-use-case";
import { StorageR2Gateway } from "../../../infra/gateway/r2/storage-r2-gateway";
import { MediaRegistryMysqlRepository } from "../../../infra/repository/mysql/media-registry-mysql-repository";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";
import { InitMemoryMediaRegistryController } from "../../../presentation/controller/init-memory-media-registry-controller";

export const initMemoryMediaRegistryControllerFactory = (): Controller => {
  const memoryRepository = new MemoryMysqlRepository();
  const mediaRegistryRepository = new MediaRegistryMysqlRepository();
  const storageGateway = new StorageR2Gateway();
  const initMemoryMediaRegistryUseCase = new InitMemoryMediaRegistryUseCase(
    memoryRepository,
    mediaRegistryRepository,
    storageGateway
  );
  const controller = new InitMemoryMediaRegistryController(
    initMemoryMediaRegistryUseCase
  );
  return controller;
};
