import { EntityManager } from "typeorm";
import { BaseRepository } from "../../application/contract/base-repository";

export type RepositoryFactory<T extends BaseRepository> = (
  manager: EntityManager
) => T;

export class RepositoryRegistry<
  TRepositories extends { [K in keyof TRepositories]: BaseRepository }
> {
  private factories = new Map<keyof TRepositories, RepositoryFactory<any>>();

  register<K extends keyof TRepositories>(
    name: K,
    factory: RepositoryFactory<TRepositories[K]>
  ) {
    this.factories.set(name, factory);
  }

  createAll(manager: EntityManager): TRepositories {
    const repos: Partial<TRepositories> = {};
    for (const [name, factory] of this.factories.entries()) {
      repos[name] = factory(manager);
    }
    return repos as TRepositories;
  }
}
