import { Middleware } from "../../../../common";
import { CanMiddleware } from "../../../presentation/middlewares/can-middleware";

export const canMiddlewareFactory = (permissions: string[]): Middleware => {
  return new CanMiddleware(permissions);
};
