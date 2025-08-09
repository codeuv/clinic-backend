import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column({ type: 'datetime' })
  appointment_time: Date;

  @Column({
    type: 'enum',
    enum: ['booked', 'completed', 'canceled'],
    default: 'booked',
  })
  status: 'booked' | 'completed' | 'canceled';

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
