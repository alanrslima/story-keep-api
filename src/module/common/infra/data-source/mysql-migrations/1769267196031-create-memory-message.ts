import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateMemoryMessage1769267196031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "memory_message",
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
            isPrimary: true,
            length: "45",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "varchar",
            isPrimary: true,
            length: "45",
            isNullable: false,
          },
          {
            name: "message",
            type: "varchar",
            length: "255",
            isNullable: false,
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
      true,
    );
    await queryRunner.createForeignKey(
      "memory_message",
      new TableForeignKey({
        name: "FK_memory_message_memory_id",
        columnNames: ["memory_id"],
        referencedTableName: "memory",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    );
    await queryRunner.createForeignKey(
      "memory_message",
      new TableForeignKey({
        name: "FK_memory_message_user_id",
        columnNames: ["user_id"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "memory_message",
      "FK_memory_message_memory_id",
    );
    await queryRunner.dropForeignKey(
      "memory_message",
      "FK_memory_message_user_id",
    );
    await queryRunner.dropTable("memory_message");
  }
}
