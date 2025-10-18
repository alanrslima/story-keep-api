import { MysqlDataSource } from "../../../../common";
import { ConfirmMemoryOrderUseCase } from "../../../application/use-case/confirm-memory-order-use-case";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";
import { MemoryOrderMysqlRepository } from "../../../infra/repository/mysql/memory-order-mysql-repository";
import { PlanMysqlRepository } from "../../../infra/repository/mysql/plan-mysql-repository";

export const confirmMemoryOrderUserCaseFactory = () => {
  const manager = MysqlDataSource.getInstance().getQueryRunner().manager;
  const memoryRepository = new MemoryMysqlRepository(manager);
  const memoryOrderRepository = new MemoryOrderMysqlRepository(manager);
  const planMysqlRepository = new PlanMysqlRepository();
  return new ConfirmMemoryOrderUseCase(
    memoryOrderRepository,
    memoryRepository,
    planMysqlRepository
  );
};
