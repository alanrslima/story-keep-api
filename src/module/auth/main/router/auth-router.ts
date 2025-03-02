import { Router } from "express";
import { adaptRoute } from "../../../common";
import { signUpControllerFactory } from "../factory/controller/sign-up-controller-factory";
import { signInEmailPasswordControllerFactory } from "../factory/controller/sign-in-email-password-controller-factory";

const router = Router();

router.post("/sign-up", adaptRoute(signUpControllerFactory()));
router.post(
  "/sign-in/email-password",
  adaptRoute(signInEmailPasswordControllerFactory())
);
router.post("/sign-in/google", adaptRoute(signUpControllerFactory()));

export { router as authRouter };
