import { Controller } from "../../../../../common";
import { DenyGuestUseCase } from "../../../../application/use-case/guest/deny-guest-use-case";
import { unityOfWorkMemoryRegistry } from "../../../../config/unit-of-work-memory-mysql-registry";
import { UnitOfWorkMemoryMysql } from "../../../../infra/unit-of-work/unit-of-work-memory-mysql";
import { DenyGuestController } from "../../../../presentation/controller/guest/deny-guest-controller";

export const denyGuestControllerFactory = (): Controller => {
  const unitOfWork = new UnitOfWorkMemoryMysql(unityOfWorkMemoryRegistry);
  const denyGuestUseCase = new DenyGuestUseCase(unitOfWork);
  const controller = new DenyGuestController(denyGuestUseCase);
  return controller;
};
