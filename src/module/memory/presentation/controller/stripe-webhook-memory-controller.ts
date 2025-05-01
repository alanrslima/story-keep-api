import Stripe from "stripe";
import { Controller, created, env, HttpResponse } from "../../../common";
import { NextFunction, Request, Response } from "express";
// import { CreateMemoryMediaRegistryUseCase } from "../../application/use-case/create-memory-media-registry-use-case";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export class StripeWebhookMemoryController {
  constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const sig = request.headers["stripe-signature"];
      const endpointSecret =
        "whsec_6980f8412927dbabbe5394d1f66cf4b2e86a9a31061f0f8d9c7594e82b1cef77"; // from Stripe dashboard
      if (!sig) {
        return response
          .status(400)
          .json({ message: "Stripe Signature not provided" });
      }
      let event: Stripe.Event | undefined = undefined;
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          sig,
          endpointSecret
        );
        console.log("event", event);
      } catch (err) {
        console.error(`Webhook Error: ${err}`);
      }

      const paymentIntent = event?.data.object as any;
      console.log(paymentIntent?.metadata);

      // Handle the event
      switch (event?.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          console.log("PaymentIntent was successful!");
          break;
        case "payment_method.attached":
          const paymentMethod = event.data.object;
          console.log("PaymentMethod was attached to a Customer!");
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event?.type}`);
      }
    } catch (error) {
      next(error);
    }
  }
}
