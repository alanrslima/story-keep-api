import { Router } from "express";
import { adaptRoute } from "../../common";
import { auth } from "../../auth/main/config";
import { autoCompleteControllerFactory } from "./factory/controller/auto-complete-controller-factory";
import { getAddressByCoordsControllerFactory } from "./factory/controller/get-address-by-coords-controller-factory copy";

const router = Router();

router.get("/auto-complete", auth, adaptRoute(autoCompleteControllerFactory()));

router.get(
  "/address-coords",
  auth,
  adaptRoute(getAddressByCoordsControllerFactory())
);

export { router as geolocationRouter };
