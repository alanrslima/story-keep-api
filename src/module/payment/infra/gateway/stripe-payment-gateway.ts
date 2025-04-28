import Stripe from "stripe";
import { PaymentGateway } from "../../application";
import { env } from "../../../common";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export class StripePaymentGateway implements PaymentGateway {
  async createPaymentIntent(params: {
    amount: number;
  }): Promise<{ token: string | null }> {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: params.amount,
      currency: "brl",
      automatic_payment_methods: { enabled: true },
    });
    return { token: paymentIntent.client_secret };
  }
}
