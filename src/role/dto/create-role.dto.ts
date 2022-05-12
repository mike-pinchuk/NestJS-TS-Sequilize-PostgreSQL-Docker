import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role on this app' })
  @IsString({ message: 'Value should be a string' })
  readonly value: string;

  @ApiProperty({
    example: 'This is an Administrator of app',
    description: 'Description of role',
  })
  @IsString({ message: 'Description should be a string' })
  readonly description: string;
}
