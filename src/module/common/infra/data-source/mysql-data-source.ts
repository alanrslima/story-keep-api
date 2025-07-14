import { DataSource, QueryRunner } from "typeorm";
import { typeormDataSource } from "./typeorm-data-source";

export class MysqlDataSource {
  private static instance: MysqlDataSource;

  private dataSource: DataSource;

  private constructor() {
    this.dataSource = typeormDataSource;
  }

  static getInstance(): MysqlDataSource {
    if (!MysqlDataSource.instance) {
      MysqlDataSource.instance = new MysqlDataSource();
    }
    return MysqlDataSource.instance;
  }

  async initialize(): Promise<void> {
    await this.dataSource.initialize();
    console.log("Succesfully connect to DB");
  }

  async transaction(fn: (queryRunner: QueryRunner) => Promise<void>) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await fn(queryRunner);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async dropDatabase() {
    await this.dataSource.dropDatabase();
  }

  async destroy() {
    await this.dataSource.destroy();
  }

  async runMigrations() {
    await this.dataSource.runMigrations();
  }

  async disconnect(): Promise<void> {
    await this.dataSource.destroy();
    console.log("Disconnected to DB");
  }

  async query<T = any>(query: string, params?: any[]): Promise<Array<T>> {
    return this.dataSource.query(query, params);
  }
}
