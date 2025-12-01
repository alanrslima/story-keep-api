import { RepositoryRegistry } from "../../common";
import { MemoryRepositories } from "../application/contract/memory-repositories";
import { GalleryMysqlRepository } from "../infra/repository/mysql/gallery-mysql-repository";
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
registry.register(
  "galleryRepository",
  (manager) => new GalleryMysqlRepository(manager)
);

export { registry as unityOfWorkMemoryRegistry };
