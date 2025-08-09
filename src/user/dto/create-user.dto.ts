export class CreateUserDto {
  username: string;
  password: string; // plain text, will be hashed before saving
  role?: 'frontdesk' | 'admin';
}
