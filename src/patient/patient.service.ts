import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  findAll(): Promise<Patient[]> {
    return this.patientRepo.find();
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepo.findOneBy({ id });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepo.create(createPatientDto);
    return this.patientRepo.save(patient);
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    await this.patientRepo.update(id, updatePatientDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.patientRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Patient not found');
  }
}
