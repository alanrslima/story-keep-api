import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateMemoryPlan1740963923409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "memory_plan",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "45",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "currency_code",
            type: "varchar",
            length: "3",
          },
          {
            name: "price_cents",
            type: "integer",
          },
          {
            name: "photos_limit",
            type: "integer",
            isNullable: true,
          },
          {
            name: "videos_limit",
            type: "integer",
            isNullable: true,
          },
          {
            name: "position",
            type: "integer",
            isNullable: false,
          },
          {
            name: "discount_id",
            type: "varchar",
            length: "45",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: "FK_memory_plan_discount_id",
            columnNames: ["discount_id"],
            referencedTableName: "discount",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "memory_plan",
      "FK_memory_plan_discount_id"
    );
    await queryRunner.dropTable("memory_plan");
  }
}
