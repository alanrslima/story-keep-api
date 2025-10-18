import { RepositoryRegistry } from "../../common";
import { MemoryRepositories } from "../application/contract/memory-repositories";
import { MemoryMysqlRepository } from "../infra/repository/mysql/memory-mysql-repository";
import { MemoryOrderMysqlRepository } from "../infra/repository/mysql/memory-order-mysql-repository";

const registry = new RepositoryRegistry<MemoryRepositories>();

registry.register(
  "memoryOrderRepository",
  (manager) => new MemoryOrderMysqlRepository(manager)
);
registry.register(
  "memoryRepository",
  (manager) => new MemoryMysqlRepository(manager)
);

export { registry as unityOfWorkMemoryRegistry };
