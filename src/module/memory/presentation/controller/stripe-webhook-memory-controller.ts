import Stripe from "stripe";
import { Controller, created, env, HttpResponse } from "../../../common";
import { NextFunction, Request, Response } from "express";
import { ConfirmMemoryPaymentUseCase } from "../../application/use-case/confirm-memory-payment-use-case";
import { MemoryMysqlRepository } from "../../infra/repository/mysql/memory-mysql-repository";
// import { CreateMemoryMediaRegistryUseCase } from "../../application/use-case/create-memory-media-registry-use-case";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export class StripeWebhookMemoryController {
  constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const sig = request.headers["stripe-signature"];
      const endpointSecret = env.STRIPE_ENDPOINT_SECRET;
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
      } catch (err) {
        console.error(`Webhook Error: ${err}`);
      }

      const paymentIntent = event?.data.object as any;
      console.log(paymentIntent?.metadata);

      // Handle the event
      switch (event?.type) {
        case "charge.succeeded":
          const memoryId = event.data.object.metadata?.memoryId;
          const memoryMysqlRepository = new MemoryMysqlRepository();
          await new ConfirmMemoryPaymentUseCase(memoryMysqlRepository).execute({
            memoryId,
          });
          console.log("PaymentIntent was successful!");
          break;
        case "payment_method.attached":
          const paymentMethod = event.data.object;
          console.log("PaymentMethod was attached to a Customer!");
          break;
        case "charge.failed":
          console.log("Cobrança falhou");
        case "payment_intent.payment_failed":
          console.log("Pagamento falhou");
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event?.type}`);
      }
      response.status(200).json({ message: "Payment processed succesfully" });
    } catch (error) {
      next(error);
    }
  }
}
