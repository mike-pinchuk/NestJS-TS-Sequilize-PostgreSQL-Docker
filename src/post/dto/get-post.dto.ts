import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReturnPostDto {
  @ApiProperty({ example: 'Some title', description: 'Title pf post' })
  @IsString({ message: 'Title should be a string' })
  readonly title: string;

  @ApiProperty({ example: 'Some content', description: 'Content of post' })
  @IsString({ message: 'Title should be a string' })
  readonly content: string;

  @ApiProperty({ example: '1' })
  readonly userId: number;

  @ApiProperty({ example: 'LOAD YOUR PHOTO', description: 'Picture for post' })
  @IsString()
  readonly image: string;
}
