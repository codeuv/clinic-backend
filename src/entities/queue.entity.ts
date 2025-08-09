import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity('queue')
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column()
  queue_number: number;

  @Column({
    type: 'enum',
    enum: ['waiting', 'with_doctor', 'completed'],
    default: 'waiting',
  })
  status: 'waiting' | 'with_doctor' | 'completed';

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
