import { Controller } from "../../../../../common";
import { AcceptGuestUseCase } from "../../../../application/use-case/guest/accept-guest-use-case";
import { unityOfWorkMemoryRegistry } from "../../../../config/unit-of-work-memory-mysql-registry";
import { UnitOfWorkMemoryMysql } from "../../../../infra/unit-of-work/unit-of-work-memory-mysql";
import { AcceptGuestController } from "../../../../presentation/controller/guest/accept-guest-controller";

export const acceptGuestControllerFactory = (): Controller => {
  const unitOfWork = new UnitOfWorkMemoryMysql(unityOfWorkMemoryRegistry);
  const acceptGuestUseCase = new AcceptGuestUseCase(unitOfWork);
  const controller = new AcceptGuestController(acceptGuestUseCase);
  return controller;
};
