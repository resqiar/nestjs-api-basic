import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1617196334722 implements MigrationInterface {
    name = 'UserMigration1617196334722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password_hash" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_hash"`);
    }

}
