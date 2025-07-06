import { join } from "path";
import { DataSource } from "typeorm";
import { env } from "../../main";

export class MysqlDataSource {
  private static instance: MysqlDataSource;

  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: "mysql",
      host: env.MYSQL_HOST,
      port: Number(env.MYSQL_PORT),
      username: env.MYSQL_USER,
      password: env.MYSQL_PASSWORD,
      database: env.MYSQL_DATABASE,
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
