import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateMemoryAddress1762881003133 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "memory_address",
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
            isUnique: true,
            length: "45",
            isNullable: false,
          },
          {
            name: "address_line1",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "address_line2",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "neighborhood",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "city",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "country",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "country_code",
            type: "varchar",
            length: "5",
            isNullable: false,
          },
          {
            name: "postcode",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "state",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "longitude",
            type: "decimal",
            precision: 10,
            scale: 6,
            isNullable: true,
          },
          {
            name: "latitude",
            type: "decimal",
            precision: 10,
            scale: 6,
            isNullable: true,
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
      "memory_address",
      new TableForeignKey({
        name: "FK_memory_address_memory_id",
        columnNames: ["memory_id"],
        referencedTableName: "memory",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "memory_address",
      "FK_memory_address_memory_id"
    );
    await queryRunner.dropTable("memory_address");
  }
}
