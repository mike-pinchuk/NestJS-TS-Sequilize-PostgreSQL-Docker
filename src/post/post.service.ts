import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { FileService } from '../file/file.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FileService,
  ) {}

  async create(dto: CreatePostDto, image: Express.Multer.File): Promise<Post> {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }
}
