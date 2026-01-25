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
import { updateMemoryControllerFactory } from "../factory/controller/update-memory-controller-factory";
import { createMemoryOrderIntentControllerFactory } from "../factory/controller/create-memory-order-intent-controller-factory";
import { selectMemoryPlanControllerFactory } from "../factory/controller/select-memory-plan-controller-factory";
import { can } from "../../../auth/main/config/middleware/can";
import { requestMemoryInviteControllerFactory } from "../factory/controller/request-memory-invite-controller-factory";
import { resumeMemoryControllerFactory } from "../factory/controller/resume-memory-controller-factory";
import { getGuestControllerFactory } from "../factory/controller/get-guest-controller-factory";
import { acceptGuestControllerFactory } from "../factory/controller/guest/accept-guest-controller-factory";
import { listGalleryControllerFactory } from "../factory/controller/list-gallery-controller-factory";
import { createMemoryMessageControllerFactory } from "../factory/controller/create-memory-message-controller-factory";
import { listMemoryMessageControllerFactory } from "../factory/controller/list-memory-message-controller.-factory";

const router = Router();

router.get("/gallery", auth, adaptRoute(listGalleryControllerFactory()));
router.get(
  "/",
  auth,
  can(["memory.list"]),
  adaptRoute(listMemoryControllerFactory()),
);
router.patch(
  "/",
  uploadMemoryStorage.single("file"),
  auth,
  can(["memory.update"]),
  adaptRoute(updateMemoryControllerFactory()),
);
router.get(
  "/detail",
  auth,
  can(["memory.list"]),
  adaptRoute(detailMemoryControllerFactory()),
);
router.get("/resume", adaptRoute(resumeMemoryControllerFactory()));
router.get("/guest", auth, adaptRoute(getGuestControllerFactory()));
router.post(
  "/init",
  auth,
  can(["memory.create"]),
  adaptRoute(initMemoryControllerFactory()),
);
router.patch(
  "/select-plan",
  auth,
  can(["memory.update"]),
  adaptRoute(selectMemoryPlanControllerFactory()),
);
router.post(
  "/order/intent",
  auth,
  can(["memory.order"]),
  adaptRoute(createMemoryOrderIntentControllerFactory()),
);

router.post(
  "/plan",
  auth,
  can(["plan.create"]),
  adaptRoute(createPlanControllerFactory()),
);
router.get(
  "/plan",
  auth,
  can(["plan.list"]),
  adaptRoute(listPlanControllerFactory()),
);

router.get(
  "/media-registry/source",
  auth,
  can(["media-registry.list"]),
  adaptRoute(readMediaRegistryControllerFactory()),
);
router.post(
  "/media-registry/init",
  auth,
  adaptRoute(initMemoryMediaRegistryControllerFactory()),
);
router.post(
  "/media-registry/confirm",
  adaptRoute(confirmMemoryMediaRegistryControllerFactory()),
);
router.get(
  "/media-registry",
  auth,
  can(["media-registry.list"]),
  adaptRoute(listMediaRegistriesControllerFactory()),
);

/** Guest routes */
router.patch("/guest/accept", auth, adaptRoute(acceptGuestControllerFactory()));
router.patch("/guest/deny", auth, adaptRoute(acceptGuestControllerFactory()));
router.post(
  "/request-invite",
  auth,
  adaptRoute(requestMemoryInviteControllerFactory()),
);

router.post(
  "/message",
  auth,
  adaptRoute(createMemoryMessageControllerFactory()),
);

router.get("/message", auth, adaptRoute(listMemoryMessageControllerFactory()));

router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  new StripeWebhookMemoryController().handle,
);

export { router as memoryRouter };
