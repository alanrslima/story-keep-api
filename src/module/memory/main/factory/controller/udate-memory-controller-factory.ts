import { Controller } from "../../../../common";
import { UpdateMemoryUseCase } from "../../../application/use-case/update-memory-use-case";
import { StorageR2Gateway } from "../../../infra/gateway/r2/storage-r2-gateway";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";
import { UpdateMemoryController } from "../../../presentation/controller/update-memory-controller";

export const updateMemoryControllerFactory = (): Controller => {
  const memoryMysqlRepository = new MemoryMysqlRepository();
  const storageGateway = new StorageR2Gateway();
  const updateMemoryUseCase = new UpdateMemoryUseCase(
    memoryMysqlRepository,
    storageGateway
  );
  const controller = new UpdateMemoryController(updateMemoryUseCase);
  return controller;
};
