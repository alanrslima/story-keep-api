import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateMemoryOrder1751738479927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "memory_order",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            length: "45",
          },
          {
            name: "memory_id",
            type: "varchar",
            length: "45",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "varchar",
            length: "45",
            isNullable: false,
          },
          {
            name: "memory_plan_id",
            type: "varchar",
            length: "45",
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            length: "45",
            isNullable: true,
          },
          {
            name: "currency_code",
            type: "varchar",
            length: "3",
          },
          {
            name: "price",
            type: "integer",
          },
          {
            name: "discount",
            type: "integer",
          },
          {
            name: "total",
            type: "integer",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "memory_order",
      new TableForeignKey({
        name: "FK_memory_order_memory_id",
        columnNames: ["memory_id"],
        referencedTableName: "memory",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      })
    );
    await queryRunner.createForeignKey(
      "memory_order",
      new TableForeignKey({
        name: "FK_memory_order_user_id",
        columnNames: ["user_id"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      })
    );
    await queryRunner.createForeignKey(
      "memory_order",
      new TableForeignKey({
        name: "FK_memory_order_memory_plan_id",
        columnNames: ["memory_plan_id"],
        referencedTableName: "memory_plan",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "memory_order",
      "FK_memory_order_memory_id"
    );
    await queryRunner.dropForeignKey("memory_order", "FK_memory_order_user_id");
    await queryRunner.dropForeignKey(
      "memory_order",
      "FK_memory_order_memory_plan_id"
    );
    await queryRunner.dropTable("memory_order");
  }
}
