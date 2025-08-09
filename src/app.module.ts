import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Doctor } from './entities/doctor.entity';
import { Patient } from './entities/patient.entity';
import { Appointment } from './entities/appointment.entity';
import { Queue } from './entities/queue.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QueueModule } from './queue/queue.module';
import { AppointmentsModule } from './appointment/appointment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'front_desk_system',
      entities: [User, Doctor, Patient, Appointment, Queue],
      synchronize: true, // ⬅ Set to true only for first run/testing
    }),
    AuthModule,
    UserModule,
    QueueModule,
    AppointmentsModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      console.log('✅ Connected to MySQL Database');
    } else {
      console.log('❌ Failed to connect to MySQL Database');
    }
  }
}
