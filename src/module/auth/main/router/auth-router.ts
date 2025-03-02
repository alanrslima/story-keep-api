import { Router } from "express";
import { adaptRoute } from "../../../common";
import { signUpControllerFactory } from "../factory/controller/sign-up-controller-factory";

const router = Router();

router.post("/sign-up", adaptRoute(signUpControllerFactory()));

export { router as authRouter };
