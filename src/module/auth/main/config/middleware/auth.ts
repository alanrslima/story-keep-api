import { adaptMiddleware } from "../../../../common";
import { authMiddlewareFactory } from "../../factory/middlewares/auth-middleware-factory";

export const auth = adaptMiddleware(authMiddlewareFactory());
