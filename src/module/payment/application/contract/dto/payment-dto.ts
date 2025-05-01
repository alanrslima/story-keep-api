export type PaymentIntentDTO = {
  amount: number;
  metadata?: Record<any, any>;
  currency: string;
};
