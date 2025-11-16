import { Controller } from "../../../../common";
import { UpdateMemoryUseCase } from "../../../application/use-case/update-memory-use-case";
import { unityOfWorkMemoryRegistry } from "../../../config/unit-of-work-memory-mysql-registry";
import { StorageR2Gateway } from "../../../infra/gateway/r2/storage-r2-gateway";
import { UnitOfWorkMemoryMysql } from "../../../infra/unit-of-work/unit-of-work-memory-mysql";
import { UpdateMemoryController } from "../../../presentation/controller/update-memory-controller";

export const updateMemoryControllerFactory = (): Controller => {
  const unitOfWorkMemoryMysql = new UnitOfWorkMemoryMysql(
    unityOfWorkMemoryRegistry
  );
  const storageGateway = new StorageR2Gateway();
  const updateMemoryUseCase = new UpdateMemoryUseCase(
    unitOfWorkMemoryMysql,
    storageGateway
  );
  const controller = new UpdateMemoryController(updateMemoryUseCase);
  return controller;
};
