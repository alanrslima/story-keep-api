import { Controller } from "../../../../common";
import { ListGalleryUseCase } from "../../../application/use-case/gallery/list-gallery-use-case";
import { unityOfWorkMemoryRegistry } from "../../../config/unit-of-work-memory-mysql-registry";
import { UnitOfWorkMemoryMysql } from "../../../infra/unit-of-work/unit-of-work-memory-mysql";
import { ListGalleryController } from "../../../presentation/controller/list-gallery-controller";

export const listGalleryControllerFactory = (): Controller => {
  const unitOfWork = new UnitOfWorkMemoryMysql(unityOfWorkMemoryRegistry);
  const listGalleryUseCase = new ListGalleryUseCase(unitOfWork);
  const controller = new ListGalleryController(listGalleryUseCase);
  return controller;
};
