import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DomainStatus {
  PENDING = 'pending',
  PASSED = 'passed',
  FAILED = 'failed',
}

@Entity('domains')
export class Domain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 10,
    enum: DomainStatus,
    default: DomainStatus.PENDING,
  })
  status: DomainStatus;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  domain: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  dmarc: boolean;

  @Column({
    name: 'dmarc_error',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  dmarcError: string | null;

  @Column({
    type: 'boolean',
    default: false,
  })
  spf: boolean;

  @Column({
    name: 'spf_error',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  spfError: string | null;

  @Column({
    type: 'boolean',
    default: false,
  })
  dkim: boolean;

  @Column({
    name: 'dkim_error',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  dkimError: string | null;

  @Column({
    name: 'error',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  error: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
