import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateDiscount1740963923408 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "discount",
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
            name: "percentage",
            type: "float",
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
    await queryRunner.dropTable("discount");
  }
}
