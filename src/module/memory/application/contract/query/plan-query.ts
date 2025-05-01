export interface PlanQuery {
  list(): Promise<PlanQueryListOutput[]>;
}

export type PlanQueryListOutput = {
  id: string;
  name: string;
  description: string;
  currencyCode: string;
  priceCents: number;
  price: string;
  priceLabel: string;
};
