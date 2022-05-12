import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

interface PostCreationAttr {
  title: string;
  content: string;
  image: string;
  userId: number;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttr> {
  @ApiProperty({ example: '1', description: 'ID of user' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '9/11', description: 'Title of post' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'Some description of them',
    description: 'Content of post',
  })
  @Column({ type: DataType.STRING })
  content: string;

  @ApiProperty({ example: 'IMG_88', description: 'image for post' })
  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
