import { Controller } from "../../../../common";
import { StripeWebhookMemoryController } from "../../../presentation/controller/stripe-webhook-memory-controller";

export const stripeWebhookMemoryControllerFactory = (): Controller => {
  const controller = new StripeWebhookMemoryController();
  return controller;
};
