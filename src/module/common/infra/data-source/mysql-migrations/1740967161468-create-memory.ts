import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateMemory1740967161468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "memory",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            length: "45",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "start_date",
            type: "datetime",
            isNullable: true,
          },
          {
            name: "address",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "cover_image",
            type: "varchar",
            length: "45",
            isNullable: true,
          },
          {
            name: "plan_id",
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
            name: "status",
            type: "enum",
            enum: [
              "created",
              "awaiting_payment",
              "paid",
              "failed",
              "canceled",
              "ready",
            ],
            default: "'created'",
          },
          {
            name: "photos_count",
            type: "int",
            default: 0,
          },
          {
            name: "videos_count",
            type: "int",
            default: 0,
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
      "memory",
      new TableForeignKey({
        columnNames: ["plan_id"],
        referencedTableName: "memory_plan",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "memory",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("memory");
  }
}
