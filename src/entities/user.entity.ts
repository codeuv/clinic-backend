import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string; // hashed later

  @Column({
    type: 'enum',
    enum: ['frontdesk', 'admin'],
    default: 'frontdesk',
  })
  role: 'frontdesk' | 'admin';

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
