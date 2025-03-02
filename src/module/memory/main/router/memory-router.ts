import { Router } from "express";
import { adaptRoute } from "../../../common";
import { createMemoryControllerFactory } from "../factory/controller/create-memory-controller-factory";

const router = Router();

router.post("/", adaptRoute(createMemoryControllerFactory()));

export { router as memoryRouter };
