import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTestUser1750169899571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Pre-computed bcrypt hash for password '12345' with salt rounds 10
    const hashedPassword =
      '$2b$10$hhZcITYX6wdw2l6sN.EyMejJNTOxqkJFyfXH7sI9dAuVtpUYqmhOy';

    await queryRunner.query(
      `
      INSERT INTO users (email, username, hashed_password, created_at, updated_at)
      VALUES ('test@test.com', 'testuser', $1, NOW(), NOW())
    `,
      [hashedPassword],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM users WHERE email = 'test@test.com'
    `);
  }
}
