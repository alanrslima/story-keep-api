import { ConfirmMemoryOrderUseCase } from "../../../application/use-case/confirm-memory-order-use-case";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";
import { MemoryOrderMysqlRepository } from "../../../infra/repository/mysql/memory-order-mysql-repository";
import { PlanMysqlRepository } from "../../../infra/repository/mysql/plan-mysql-repository";

export const confirmMemoryOrderUserCaseFactory = () => {
  const memoryRepository = new MemoryMysqlRepository();
  const memoryOrderRepository = new MemoryOrderMysqlRepository();
  const planMysqlRepository = new PlanMysqlRepository();
  return new ConfirmMemoryOrderUseCase(
    memoryOrderRepository,
    memoryRepository,
    planMysqlRepository
  );
};
