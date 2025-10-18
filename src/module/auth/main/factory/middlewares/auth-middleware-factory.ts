import { Middleware } from "../../../../common";
import { UnitOfWorkAuthMysql } from "../../../infra/repository/auth-unit-of-work-mysql";
import { AuthMiddleware } from "../../../presentation/middlewares/auth-middleware";
import { unityOfWorkAuthRegistry } from "../../config/unit-of-work-auth-mysql-registry";

export const authMiddlewareFactory = (): Middleware => {
  return new AuthMiddleware(new UnitOfWorkAuthMysql(unityOfWorkAuthRegistry));
};
