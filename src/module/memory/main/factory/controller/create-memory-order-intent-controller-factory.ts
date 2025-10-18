import { Controller } from "../../../../common";
import { StripePaymentGateway } from "../../../../payment";
import { CreateMemoryOrderIntentUseCase } from "../../../application/use-case/create-memory-order-intent-use-case";
import { unityOfWorkMemoryRegistry } from "../../../config/unit-of-work-memory-mysql-registry";
import { UnitOfWorkMemoryMysql } from "../../../infra/unit-of-work/unit-of-work-memory-mysql";
import { CreateMemoryOrderIntentController } from "../../../presentation/controller/create-memory-order-intent-controller";

export const createMemoryOrderIntentControllerFactory = (): Controller => {
  const paymentGateway = new StripePaymentGateway();
  const unitOfWork = new UnitOfWorkMemoryMysql(unityOfWorkMemoryRegistry);
  const createMemoryOrderIntentUseCase = new CreateMemoryOrderIntentUseCase(
    unitOfWork,
    paymentGateway
  );
  const controller = new CreateMemoryOrderIntentController(
    createMemoryOrderIntentUseCase
  );
  return controller;
};
