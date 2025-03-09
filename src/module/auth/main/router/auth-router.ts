import { Router } from "express";
import { adaptRoute } from "../../../common";
import { signUpControllerFactory } from "../factory/controller/sign-up-controller-factory";
import { signInEmailPasswordControllerFactory } from "../factory/controller/sign-in-email-password-controller-factory";
import { getMeControllerFactory } from "../factory/controller/get-me-controller-factory";
import { auth } from "../config";
import { signInGoogleControllerFactory } from "../factory/controller/sign-in-google-controller-factory";
import { signInGoogleCallbackControllerFactory } from "../factory/controller/sign-in-google-callback-controller-factory";

const router = Router();

router.post("/sign-up", adaptRoute(signUpControllerFactory()));
router.post(
  "/sign-in/email-password",
  adaptRoute(signInEmailPasswordControllerFactory())
);
router.post("/sign-in/google", adaptRoute(signInGoogleControllerFactory()));
router.post(
  "/sign-in/google/callback",
  adaptRoute(signInGoogleCallbackControllerFactory())
);
router.get("/me", auth, adaptRoute(getMeControllerFactory()));

export { router as authRouter };
