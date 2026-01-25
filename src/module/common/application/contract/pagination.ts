export interface PaginationInput {
  page: number;
  perPage: number;
}

export interface PaginationOutput<T> {
  data: T[];
  page: number;
  perPage: number;
  total: number;
}
