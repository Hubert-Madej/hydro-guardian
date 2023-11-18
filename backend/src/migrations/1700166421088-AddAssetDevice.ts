import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAssetDevice1700166421088 implements MigrationInterface {
  name = 'AddAssetDevice1700166421088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "asset_device" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "tag" character varying(255) NOT NULL, "date_of_registration" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c50465935726599b76069c6f974" PRIMARY KEY ("uuid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "asset_device"`);
  }
}
