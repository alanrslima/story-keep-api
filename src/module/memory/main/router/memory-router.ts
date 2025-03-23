import { Router } from "express";
import { adaptRoute } from "../../../common";
import { createMemoryControllerFactory } from "../factory/controller/create-memory-controller-factory";
import { createPlanControllerFactory } from "../factory/controller/create-plan-controller-factory";
import { auth } from "../../../auth/main/config";
import { listMemoryControllerFactory } from "../factory/controller/list-memory-controller-factory";
import { initMemoryMediaRegistryControllerFactory } from "../factory/controller/init-memory-media-registry-controller-factory";
import { confirmMemoryMediaRegistryControllerFactory } from "../factory/controller/confirm-memory-media-registry-controller-factory";

const router = Router();

router.get("/", auth, adaptRoute(listMemoryControllerFactory()));
router.post("/", auth, adaptRoute(createMemoryControllerFactory()));
router.post("/plan", auth, adaptRoute(createPlanControllerFactory()));
router.post(
  "/media-registry/init",
  auth,
  adaptRoute(initMemoryMediaRegistryControllerFactory())
);
router.post(
  "/media-registry/confirm",
  auth,
  adaptRoute(confirmMemoryMediaRegistryControllerFactory())
);

export { router as memoryRouter };
