import { IsDateString, IsEnum, IsOptional, IsInt } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsInt()
  patientId?: number;

  @IsOptional()
  @IsInt()
  doctorId?: number;

  @IsOptional()
  @IsDateString()
  appointment_time?: string;

  @IsOptional()
  @IsEnum(['booked', 'completed', 'canceled'])
  status?: 'booked' | 'completed' | 'canceled';
}
