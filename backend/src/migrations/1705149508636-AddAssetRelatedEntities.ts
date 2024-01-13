import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1705149508636 implements MigrationInterface {
  name = 'Migrations1705149508636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "resource-groups" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" text NOT NULL, CONSTRAINT "PK_ae7169c51ff570ca70be61dc9cb" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "asset-devices" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "tag" character varying(255) NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "report" boolean NOT NULL DEFAULT false, "created_by_uuid" uuid NOT NULL, "date_of_registration" TIMESTAMP NOT NULL DEFAULT now(), "resourceGroupUuid" uuid, CONSTRAINT "PK_a1124351b8034ee0aa6bb20ae6b" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "asset-devices" ADD CONSTRAINT "FK_24d351ccf2c63414a201845fe56" FOREIGN KEY ("resourceGroupUuid") REFERENCES "asset-devices"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "asset-devices" DROP CONSTRAINT "FK_24d351ccf2c63414a201845fe56"`,
    );
    await queryRunner.query(`DROP TABLE "asset-devices"`);
    await queryRunner.query(`DROP TABLE "resource-groups"`);
  }
}
