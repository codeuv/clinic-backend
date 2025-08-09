import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  findAll(): Promise<Doctor[]> {
    return this.doctorRepo.find();
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepo.findOneBy({ id });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepo.create(createDoctorDto);
    return this.doctorRepo.save(doctor);
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    await this.doctorRepo.update(id, updateDoctorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.doctorRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Doctor not found');
  }
}
