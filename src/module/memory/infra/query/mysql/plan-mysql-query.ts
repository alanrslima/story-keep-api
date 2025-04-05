import { MysqlDataSource } from "../../../../common";
import {
  PlanQuery,
  PlanQueryListOutput,
} from "../../../application/contract/query/plan-query";

export class PlanMysqlQuery implements PlanQuery {
  async list(): Promise<PlanQueryListOutput[]> {
    const sql = `SELECT id, name, description, currency_code as currencyCode, price FROM memory_plan`;
    return MysqlDataSource.getInstance().query(sql);
  }
}
