import { WaitingMemoryOrderUseCase } from "../../../application/use-case/processing-memory-order-use-case";
import { unityOfWorkMemoryRegistry } from "../../../config/unit-of-work-memory-mysql-registry";
import { UnitOfWorkMemoryMysql } from "../../../infra/unit-of-work/unit-of-work-memory-mysql";

export const waitingMemoryOrderUserCaseFactory = () => {
  const unitOfWork = new UnitOfWorkMemoryMysql(unityOfWorkMemoryRegistry);
  return new WaitingMemoryOrderUseCase(unitOfWork);
};
