import { MysqlDataSource } from "../src/module/common";
import { runSeeds } from "./seeds";

beforeAll(async () => {
  await MysqlDataSource.getInstance().initialize();
  // await MysqlDatabase.getInstance().connect();
});

beforeEach(async () => {
  await MysqlDataSource.getInstance().dropDatabase();
  await MysqlDataSource.getInstance().runMigrations();
  await runSeeds();
}, 10000);

afterAll(async () => {
  await MysqlDataSource.getInstance().destroy();
});
