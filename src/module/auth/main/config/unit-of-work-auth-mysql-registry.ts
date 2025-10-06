import { RepositoryRegistry } from "../../../common";
import { AuthRepositories } from "../../application/contract/dto/auth-repositories";
import { SessionMysqlRepository } from "../../infra/repository/mysql/session-mysql-repository";
import { UserMysqlRepository } from "../../infra/repository/mysql/user-mysql-repository";

const registry = new RepositoryRegistry<AuthRepositories>();

registry.register(
  "userRepository",
  (manager) => new UserMysqlRepository(manager)
);
registry.register(
  "sessionRepository",
  (manager) => new SessionMysqlRepository(manager)
);

export { registry as unityOfWorkAuthRegistry };
