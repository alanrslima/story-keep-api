import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateMediaRegistry1742733463321 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "media_registry",
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
            name: "persona_id",
            type: "varchar",
            length: "45",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "varchar",
            length: "45",
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "mimetype",
            type: "varchar",
            length: "128",
            isNullable: false,
          },
          {
            name: "url",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "size",
            type: "int",
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            length: "45",
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
      "media_registry",
      new TableForeignKey({
        name: "FK_media_registry_memory_id",
        columnNames: ["memory_id"],
        referencedTableName: "memory",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "media_registry",
      "FK_media_registry_memory_id",
    );
    await queryRunner.dropTable("media_registry");
  }
}
