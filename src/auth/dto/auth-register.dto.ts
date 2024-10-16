import { IsEmail, IsNotEmpty, IsEnum, MinLength } from 'class-validator';

export class AuthRegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(['male', 'female', 'other'])
  gender: 'male' | 'female' | 'other';
}
