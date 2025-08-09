import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from '../entities/queue.entity';
import { Patient } from '../entities/patient.entity';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue) private queueRepo: Repository<Queue>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
  ) {}

  async create(dto: CreateQueueDto) {
    const patient = await this.patientRepo.findOne({
      where: { id: dto.patientId },
    });
    if (!patient) throw new NotFoundException('Patient not found');

    const queueEntry = this.queueRepo.create({
      patient,
      queue_number: dto.queue_number,
      status: dto.status || 'waiting',
    });

    return this.queueRepo.save(queueEntry);
  }

  findAll() {
    return this.queueRepo.find({ relations: ['patient'] });
  }

  async update(id: number, dto: UpdateQueueDto) {
    const queue = await this.queueRepo.findOne({
      where: { id },
      relations: ['patient'],
    });
    if (!queue) throw new NotFoundException('Queue entry not found');

    if (dto.patientId) {
      const patient = await this.patientRepo.findOne({
        where: { id: dto.patientId },
      });
      if (!patient) throw new NotFoundException('Patient not found');
      queue.patient = patient;
    }

    if (dto.queue_number !== undefined) queue.queue_number = dto.queue_number;
    if (dto.status) queue.status = dto.status;

    return this.queueRepo.save(queue);
  }

  async remove(id: number) {
    const result = await this.queueRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Queue entry not found');
    return { deleted: true };
  }
}
