export interface UnitOfWork<TRepositories extends Record<string, any>> {
  execute<T>(work: (repos: TRepositories) => Promise<T>): Promise<T>;
}
