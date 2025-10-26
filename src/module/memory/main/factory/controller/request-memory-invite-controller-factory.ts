import { Controller } from "../../../../common";
import { RequestMemoryInviteUseCase } from "../../../application/use-case/request-memory-invite-use-case";
import { unityOfWorkMemoryRegistry } from "../../../config/unit-of-work-memory-mysql-registry";
import { UnitOfWorkMemoryMysql } from "../../../infra/unit-of-work/unit-of-work-memory-mysql";
import { RequestMemoryInviteController } from "../../../presentation/controller/request-memory-invite-controller";

export const requestMemoryInviteControllerFactory = (): Controller => {
  const unitOfWork = new UnitOfWorkMemoryMysql(unityOfWorkMemoryRegistry);
  const requestMemoryInviteUseCase = new RequestMemoryInviteUseCase(unitOfWork);
  const controller = new RequestMemoryInviteController(
    requestMemoryInviteUseCase
  );
  return controller;
};
