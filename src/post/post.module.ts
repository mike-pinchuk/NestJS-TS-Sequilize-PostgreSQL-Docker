import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.model';
import { User } from '../user/user.model';
import { FileModule } from '../file/file.module';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [SequelizeModule.forFeature([User, Post]), FileModule],
})
export class PostModule {}
