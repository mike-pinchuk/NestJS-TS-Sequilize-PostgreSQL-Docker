import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Good fraises', description: 'Title of post' })
  @IsString({ message: 'Title should be a string' })
  readonly title: string;

  @ApiProperty({
    example:
      'There is something behind the thron greater than the king himself',
    description: 'Description of post',
  })
  @IsString({ message: 'Title should be a string' })
  readonly content: string;

  readonly userId: number;
}
