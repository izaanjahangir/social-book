import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  gender: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}