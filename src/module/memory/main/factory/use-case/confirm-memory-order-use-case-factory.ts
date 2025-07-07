import { ConfirmMemoryOrderUseCase } from "../../../application/use-case/confirm-memory-order-use-case";
import { MemoryMysqlRepository } from "../../../infra/repository/mysql/memory-mysql-repository";
import { MemoryOrderMysqlRepository } from "../../../infra/repository/mysql/memory-order-mysql-repository";

export const confirmMemoryOrderUserCaseFactory = () => {
  const memoryRepository = new MemoryMysqlRepository();
  const memoryOrderRepository = new MemoryOrderMysqlRepository();
  return new ConfirmMemoryOrderUseCase(memoryOrderRepository, memoryRepository);
};
