import { PaymentGateway } from "../../application";

export class PaymentMemoryGateway implements PaymentGateway {
  async createPaymentIntent(): Promise<{ token: string | null }> {
    return { token: "123" };
  }
}
