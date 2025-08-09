import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  specialization: string;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'other'],
  })
  gender: 'male' | 'female' | 'other';

  @Column({ length: 100, nullable: true })
  location: string;

  @Column({ type: 'json', nullable: true })
  availability: string[]; // example: ["09:00-12:00", "14:00-17:00"]

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
