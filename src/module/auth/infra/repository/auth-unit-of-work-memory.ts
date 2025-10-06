import { UnitOfWork } from "../../../common";
import { AuthRepositories } from "../../application/contract/dto/auth-repositories";

export class UnitOfWorkAuthMemory<
  TRepositories extends { [K in keyof AuthRepositories]: any }
> implements UnitOfWork<TRepositories>
{
  constructor(private readonly repositories: TRepositories) {}

  async execute<T>(work: (repos: TRepositories) => Promise<T>): Promise<T> {
    return work(this.repositories);
  }
}
