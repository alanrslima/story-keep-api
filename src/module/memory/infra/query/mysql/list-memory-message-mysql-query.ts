import { MysqlDataSource } from "../../../../common";
import {
  ListMemoryMessageQuery,
  ListMemoryMessageQueryInput,
  ListMemoryMessageQueryOutput,
} from "../../../application/contract/query/list-memory-message-query";

type MemoryMessageRow = {
  id: string;
  user_name: string;
  user_profile_url: string;
  message: string;
  created_at: string;
};

export class ListMemoryMessageMysqlQuery implements ListMemoryMessageQuery {
  private readonly connection: MysqlDataSource;

  constructor() {
    this.connection = MysqlDataSource.getInstance();
  }

  async execute(
    input: ListMemoryMessageQueryInput,
  ): Promise<ListMemoryMessageQueryOutput> {
    const { memoryId, page, perPage } = input;
    const offset = (page - 1) * perPage;
    const where: string[] = [];
    const params: any[] = [];
    if (memoryId) {
      where.push("a.memory_id = ?");
      params.push(memoryId);
    }
    const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const [countRows] = await this.connection.query<{ total: number }>(
      `
      SELECT COUNT(*) as total
      FROM memory_message a
      ${whereClause}
      `,
      params,
    );
    const total = Number(countRows?.total) ?? 0;
    const rows = await this.connection.query<MemoryMessageRow>(
      `
      SELECT
        a.id,
        a.message,
        b.name as user_name,
        b.profile_url as user_profile_url,
        a.created_at
      FROM memory_message a
      LEFT JOIN user b ON a.user_id = b.id
      ${whereClause}
      ORDER BY a.created_at DESC
      LIMIT ? OFFSET ?
      `,
      [...params, perPage, offset],
    );
    return {
      data: rows.map((row) => ({
        id: row.id,
        message: row.message,
        user: {
          name: row.user_name,
          profileUrl: row.user_profile_url,
        },
        createdAt: new Date(row.created_at),
      })),
      page,
      perPage,
      total,
    };
  }
}
