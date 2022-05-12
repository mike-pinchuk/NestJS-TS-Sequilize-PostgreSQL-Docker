import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'USER', description: 'Role on this app' })
  @IsString({ message: 'It should be a string' })
  readonly value: string;

  @ApiProperty({ example: '1', description: 'ID of user' })
  @IsNumber({}, { message: 'It should be a number' })
  readonly userId: number;
}
