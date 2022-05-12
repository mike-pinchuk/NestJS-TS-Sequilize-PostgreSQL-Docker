import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'sobaka@gmail.com', description: 'email of user' })
  @IsEmail({}, { message: 'Not valid email' })
  @IsString({ message: 'e-mail always should be a string' })
  readonly email: string;

  @ApiProperty({ example: 'password', description: 'user password' })
  @IsString({ message: 'password always should be a string' })
  @Length(4, 16, { message: 'Password should be from 4 till 16 simbols' })
  readonly password: string;
}
