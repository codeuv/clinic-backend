export class CreateDoctorDto {
  name: string;
  specialization: string;
  gender: 'male' | 'female' | 'other';
  location?: string;
  availability?: string[]; // JSON string or adapt as needed
}
