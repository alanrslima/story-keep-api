import { Middleware } from "../../../../common";
import { UserMysqlRepository } from "../../../infra/repository/mysql/user-mysql-repository";
import { AuthMiddleware } from "../../../presentation/middlewares/auth-middleware";

export const authMiddlewareFactory = (): Middleware => {
  const userRepository = new UserMysqlRepository();
  return new AuthMiddleware(userRepository);
};
