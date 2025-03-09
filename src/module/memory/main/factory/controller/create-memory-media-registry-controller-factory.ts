import { Controller } from "../../../../common";
import { CreateMemoryMediaRegistryUseCase } from "../../../application/use-case/create-memory-media-registry-use-case";
import { StorageMemoryGateway } from "../../../infra/gateway/memory/storage-memory-gateway";
import { MediaRegistryMemoryRepository } from "../../../infra/repository/memory/media-registry-memory-repository";
import { MemoryMemoryRepository } from "../../../infra/repository/memory/memory-memory-repository";
import { CreateMemoryMediaRegistryController } from "../../../presentation/controller/create-memory-media-registry-controller";

export const createMemoryMediaRegistryControllerFactory = (): Controller => {
  const memoryRepository = new MemoryMemoryRepository();
  const mediaRegistryRepository = new MediaRegistryMemoryRepository();
  const storageGateway = new StorageMemoryGateway();
  const createPlanUseCase = new CreateMemoryMediaRegistryUseCase(
    memoryRepository,
    mediaRegistryRepository,
    storageGateway
  );
  const controller = new CreateMemoryMediaRegistryController(createPlanUseCase);
  return controller;
};
