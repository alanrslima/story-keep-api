import { join } from "path";
import { DataSource } from "typeorm";

export class MysqlDataSource {
  private static instance: MysqlDataSource;

  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "story_keep",
      migrationsRun: true,
      synchronize: true,
      logging: false,
      migrations: [join(__dirname, "mysql-migrations", "*.{ts,js}")],
    });
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

  async disconnect(): Promise<void> {
    await this.dataSource.destroy();
    console.log("Disconnected to DB");
  }

  async query<T = any>(query: string, params?: any[]): Promise<Array<T>> {
    return this.dataSource.query(query, params);
  }
}
