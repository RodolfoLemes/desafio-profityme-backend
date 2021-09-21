import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('fees')
class Fee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int2', name: 'percentage_amount' })
  percentageAmount: number;

  @Column({ type: 'timestamp with time zone', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamp with time zone', name: 'end_date' })
  endDate: Date;

  @Column({ type: 'boolean', name: 'is_default' })
  isDefault: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Fee;
