import { IsDateString, IsEnum, IsInt } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  patientId: number;

  @IsInt()
  doctorId: number;

  @IsDateString()
  appointment_time: string; // ISO date format

  @IsEnum(['booked', 'completed', 'canceled'])
  status: 'booked' | 'completed' | 'canceled';
}
