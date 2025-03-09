import { Router } from "express";
import { adaptRoute, uploadDiskStorage } from "../../../common";
import { createMemoryControllerFactory } from "../factory/controller/create-memory-controller-factory";
import { createPlanControllerFactory } from "../factory/controller/create-plan-controller-factory";
import { auth } from "../../../auth/main/config";
import { createMemoryMediaRegistryControllerFactory } from "../factory/controller/create-memory-media-registry-controller-factory";

const router = Router();

router.post("/", auth, adaptRoute(createMemoryControllerFactory()));
router.post("/plan", auth, adaptRoute(createPlanControllerFactory()));
router.post(
  "/media-registry",
  auth,
  uploadDiskStorage.single("media"),
  adaptRoute(createMemoryMediaRegistryControllerFactory())
);

export { router as memoryRouter };
