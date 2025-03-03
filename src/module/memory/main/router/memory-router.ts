import { Router } from "express";
import { adaptRoute } from "../../../common";
import { createMemoryControllerFactory } from "../factory/controller/create-memory-controller-factory";
import { createPlanControllerFactory } from "../factory/controller/create-plan-controller-factory";
import { auth } from "../../../auth/main/config";

const router = Router();

router.post("/", auth, adaptRoute(createMemoryControllerFactory()));
router.post("/plan", auth, adaptRoute(createPlanControllerFactory()));

export { router as memoryRouter };
