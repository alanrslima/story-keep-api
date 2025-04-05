export interface PlanQuery {
  list(): Promise<PlanQueryListOutput[]>;
}

export type PlanQueryListOutput = {
  id: string;
  name: string;
  description: string;
  currencyCode: string;
  price: number;
  photosLimit: number;
  videosLimit: number;
};
