import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: '1', description: 'ID of user' })
  @IsString({ message: 'It should be a string' })
  readonly userId: number;

  @ApiProperty({ example: 'true', description: 'Ban reason' })
  @IsNumber({}, { message: 'It should be a number' })
  readonly banReasson: string;
}
