import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1616836723520 implements MigrationInterface {
    name = 'UserMigration1616836723520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "age" integer DEFAULT '18', "isPaid" boolean DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_457bfa3e35350a716846b03102d" PRIMARY KEY ("_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
