import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail() // ensures it's a valid email format
  @IsNotEmpty() // ensures it's not empty
  email!: string;

  @IsString() // ensures it's a string
  @IsNotEmpty() // ensures it's not empty
  password!: string;
}
