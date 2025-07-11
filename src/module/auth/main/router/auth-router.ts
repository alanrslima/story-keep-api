import { Router } from "express";
import { adaptRoute } from "../../../common";
import { signUpControllerFactory } from "../factory/controller/sign-up-controller-factory";
import { signInEmailPasswordControllerFactory } from "../factory/controller/sign-in-email-password-controller-factory";
import { getMeControllerFactory } from "../factory/controller/get-me-controller-factory";
import { auth } from "../config";
import { signInGoogleCallbackControllerFactory } from "../factory/controller/sign-in-google-callback-controller-factory";
import { signInGoogleOAuthControllerFactory } from "../factory/controller/sign-in-google-oauth-controller-factory";
import { completeFirstLoginControllerFactory } from "../factory/controller/complete-first-login-controller-factory";

const router = Router();

router.post("/sign-up", adaptRoute(signUpControllerFactory()));
router.post(
  "/sign-in/email-password",
  adaptRoute(signInEmailPasswordControllerFactory())
);
router.post(
  "/complete-first-login",
  auth,
  adaptRoute(completeFirstLoginControllerFactory())
);
// router.post("/sign-in/google", adaptRoute(signInGoogleControllerFactory()));
router.post(
  "/sign-in/google/callback",
  adaptRoute(signInGoogleCallbackControllerFactory())
);
router.get("/me", auth, adaptRoute(getMeControllerFactory()));

router.post(
  "/sign-in/google",
  adaptRoute(signInGoogleOAuthControllerFactory())
);

export { router as authRouter };
