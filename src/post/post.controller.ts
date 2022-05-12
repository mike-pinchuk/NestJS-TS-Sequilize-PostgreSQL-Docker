import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { Express } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReturnPostDto } from './dto/get-post.dto';
import { Roles } from '../decorator/roles-auth.decorator';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({ summary: 'Saving posts' })
  @ApiResponse({ status: 201, type: [ReturnPostDto] })
  @Roles('ADMIN', 'USER')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() postDto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ReturnPostDto> {
    return this.postService.create(postDto, image);
  }
}
