import { Module, OnModuleInit } from '@nestjs/common';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Doctor } from './entities/doctor.entity';
import { Patient } from './entities/patient.entity';
import { Appointment } from './entities/appointment.entity';
import { Queue } from './entities/queue.entity';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';

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
      synchronize: false, // we already have DB tables
    }),
    TypeOrmModule.forFeature([User, Doctor, Patient, Appointment, Queue]),
    AuthModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      console.log('✅ Connected to MySQL Database');
    } else {
      console.log('❌ Failed to connect to MySQL Database');
    }
  }
}
