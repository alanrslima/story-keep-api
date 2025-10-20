import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1740935262375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
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
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "profile_url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_first_login",
            type: "boolean",
            isNullable: false,
          },
          {
            name: "salt",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "role",
            type: "varchar",
            length: "64",
          },
          {
            name: "status",
            type: "varchar",
            length: "64",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
