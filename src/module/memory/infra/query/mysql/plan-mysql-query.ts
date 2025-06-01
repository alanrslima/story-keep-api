import { MysqlDataSource } from "../../../../common";
import {
  PlanQuery,
  PlanQueryListOutput,
} from "../../../application/contract/query/plan-query";

export class PlanMysqlQuery implements PlanQuery {
  private formatPrice(cents: number): string {
    const price = cents / 100;
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  private formatPriceLabel(cents: number) {
    if (cents === 0) return "Grátis";
    return this.formatPrice(cents);
  }

  async list(): Promise<PlanQueryListOutput[]> {
    const sql = `SELECT 
      id, 
      name, 
      description, 
      currency_code as currencyCode, 
      price_cents as priceCents 
    FROM memory_plan`;
    const data = await MysqlDataSource.getInstance().query<PlanQueryListOutput>(
      sql
    );
    return data.map((item) => ({
      ...item,
      price: this.formatPrice(item.priceCents),
      priceLabel: this.formatPriceLabel(item.priceCents),
    }));
  }
}
