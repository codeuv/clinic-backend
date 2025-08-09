import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Queue } from '../entities/queue.entity';
import { Patient } from '../entities/patient.entity';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Queue, Patient])],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
