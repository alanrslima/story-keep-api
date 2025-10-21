import { adaptMiddleware } from "../../../../common";
import { availablePermissions } from "../../../domain/contract/available-permissions";
import { canMiddlewareFactory } from "../../factory/middlewares/can-middleware-factory";

export const can = (permissions: Array<keyof typeof availablePermissions>) =>
  adaptMiddleware(canMiddlewareFactory(permissions));
