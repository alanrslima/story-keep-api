import {
  MysqlDataSource,
  RepositoryRegistry,
  UnitOfWork,
} from "../../../common";

export class UnitOfWorkMemoryMysql<TRepositories extends Record<string, any>>
  implements UnitOfWork<TRepositories>
{
  constructor(private registry: RepositoryRegistry<TRepositories>) {}

  async execute<T>(work: (repos: TRepositories) => Promise<T>): Promise<T> {
    const queryRunner = MysqlDataSource.getInstance().getQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const repos = this.registry.createAll(queryRunner.manager);
      const result = await work(repos);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
