import { UnitOfWork } from "../../../common";
import { MemoryRepositories } from "../../application/contract/memory-repositories";

export class UnitOfWorkMemoryMemory<
  TRepositories extends { [K in keyof MemoryRepositories]: any }
> implements UnitOfWork<TRepositories>
{
  constructor(private readonly repositories: TRepositories) {}

  async execute<T>(work: (repos: TRepositories) => Promise<T>): Promise<T> {
    return work(this.repositories);
  }
}
