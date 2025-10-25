import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateMemoryGuest1752378447837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "memory_guest",
        columns: [
          {
            name: "user_id",
            type: "varchar",
            isPrimary: true,
            length: "45",
            isNullable: false,
          },
          {
            name: "memory_id",
            type: "varchar",
            length: "45",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            length: "45",
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
      "memory_guest",
      new TableForeignKey({
        name: "FK_memory_guest_memory_id",
        columnNames: ["memory_id"],
        referencedTableName: "memory",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "memory_guest",
      new TableForeignKey({
        name: "FK_memory_guest_user_id",
        columnNames: ["user_id"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "memory_guest",
      "FK_memory_guest_memory_id"
    );
    await queryRunner.dropForeignKey("memory_guest", "FK_memory_guest_user_id");
    await queryRunner.dropTable("memory_guest");
  }
}
