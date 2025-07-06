import express, { Router } from "express";
import { adaptRoute, uploadMemoryStorage } from "../../../common";
import { createPlanControllerFactory } from "../factory/controller/create-plan-controller-factory";
import { auth } from "../../../auth/main/config";
import { listMemoryControllerFactory } from "../factory/controller/list-memory-controller-factory";
import { initMemoryMediaRegistryControllerFactory } from "../factory/controller/init-memory-media-registry-controller-factory";
import { confirmMemoryMediaRegistryControllerFactory } from "../factory/controller/confirm-memory-media-registry-controller-factory";
import { detailMemoryControllerFactory } from "../factory/controller/detail-memory-controller-factory";
import { readMediaRegistryControllerFactory } from "../factory/controller/read-media-registry-controller-factory";
import { listPlanControllerFactory } from "../factory/controller/list-plan-controller-factory";
import { StripeWebhookMemoryController } from "../../presentation/controller/stripe-webhook-memory-controller";
import { listMediaRegistriesControllerFactory } from "../factory/controller/list-media-registries-controller-factory";
import { initMemoryControllerFactory } from "../factory/controller/init-memory-controller-factory";
import { updateMemoryControllerFactory } from "../factory/controller/udate-memory-controller-factory";
import { createMemoryOrderIntentControllerFactory } from "../factory/controller/create-memory-order-intent-controller-factory";
import { selectMemoryPlanControllerFactory } from "../factory/controller/select-memory-plan-controller-factory";

const router = Router();

router.get("/", auth, adaptRoute(listMemoryControllerFactory()));
router.patch(
  "/",
  uploadMemoryStorage.single("file"),
  auth,
  adaptRoute(updateMemoryControllerFactory())
);
router.get("/detail", auth, adaptRoute(detailMemoryControllerFactory()));
router.post("/init", auth, adaptRoute(initMemoryControllerFactory()));
router.patch(
  "/select-plan",
  auth,
  adaptRoute(selectMemoryPlanControllerFactory())
);
router.post(
  "/order/intent",
  auth,
  adaptRoute(createMemoryOrderIntentControllerFactory())
);
// router.post(
//   "/",
//   auth,
//   uploadMemoryStorage.single("file"),
//   adaptRoute(createMemoryControllerFactory())
// );
router.post("/plan", auth, adaptRoute(createPlanControllerFactory()));
router.get("/plan", auth, adaptRoute(listPlanControllerFactory()));

router.get(
  "/media-registry/source",
  auth,
  adaptRoute(readMediaRegistryControllerFactory())
);
router.post(
  "/media-registry/init",
  adaptRoute(initMemoryMediaRegistryControllerFactory())
);
router.post(
  "/media-registry/confirm",
  adaptRoute(confirmMemoryMediaRegistryControllerFactory())
);
router.get(
  "/media-registry",
  auth,
  adaptRoute(listMediaRegistriesControllerFactory())
);

router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  new StripeWebhookMemoryController().handle
);

export { router as memoryRouter };
