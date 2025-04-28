export interface PaymentGateway {
  createPaymentIntent(params: {
    amount: number;
  }): Promise<{ token: string | null }>;
}
