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
      logging: true,
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

  async query(query: string, params: any[]) {
    return this.dataSource.query(query, params);
  }
}
