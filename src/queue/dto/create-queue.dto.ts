import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreateQueueDto {
  @IsInt()
  @IsNotEmpty()
  patientId: number;

  @IsInt()
  @IsNotEmpty()
  queue_number: number;

  @IsEnum(['waiting', 'with_doctor', 'completed'])
  status?: 'waiting' | 'with_doctor' | 'completed';
}
