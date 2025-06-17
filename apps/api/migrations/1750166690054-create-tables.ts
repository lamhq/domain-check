import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1750166690054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "username" VARCHAR(50) UNIQUE NOT NULL,
        "email" varchar(255) NOT NULL UNIQUE,
        "hashed_password" TEXT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);

    // Create domains table
    await queryRunner.query(`
      CREATE TABLE "domains" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "status" varchar(10) NOT NULL CHECK (status IN ('pending', 'passed', 'failed')),
        "domain" varchar(255) NOT NULL UNIQUE,
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "dmarc" boolean NOT NULL DEFAULT false,
        "dmarc_error" varchar(255),
        "spf" boolean NOT NULL DEFAULT false,
        "spf_error" varchar(255),
        "dkim" boolean NOT NULL DEFAULT false,
        "dkim_error" varchar(255)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "domains"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}
