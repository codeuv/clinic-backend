import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Patient } from '../entities/patient.entity';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async findAll() {
    return this.appointmentRepo.find({ relations: ['patient', 'doctor'] });
  }

  async create(dto: CreateAppointmentDto) {
    const patient = await this.patientRepo.findOne({
      where: { id: dto.patientId },
    });
    const doctor = await this.doctorRepo.findOne({
      where: { id: dto.doctorId },
    });

    if (!patient || !doctor) {
      throw new NotFoundException('Patient or Doctor not found');
    }

    const appointment = this.appointmentRepo.create({
      patient,
      doctor,
      appointment_time: new Date(dto.appointment_time),
      status: dto.status,
    });

    return this.appointmentRepo.save(appointment);
  }

  async update(id: number, dto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepo.findOne({
      where: { id },
      relations: ['patient', 'doctor'],
    });
    if (!appointment) throw new NotFoundException('Appointment not found');

    if (dto.patientId) {
      const patient = await this.patientRepo.findOne({
        where: { id: dto.patientId },
      });
      if (!patient) throw new NotFoundException('Patient not found');
      appointment.patient = patient;
    }

    if (dto.doctorId) {
      const doctor = await this.doctorRepo.findOne({
        where: { id: dto.doctorId },
      });
      if (!doctor) throw new NotFoundException('Doctor not found');
      appointment.doctor = doctor;
    }

    if (dto.appointment_time) {
      appointment.appointment_time = new Date(dto.appointment_time);
    }

    if (dto.status) {
      appointment.status = dto.status;
    }

    return this.appointmentRepo.save(appointment);
  }

  async remove(id: number) {
    const appointment = await this.appointmentRepo.findOne({ where: { id } });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return this.appointmentRepo.remove(appointment);
  }
}
