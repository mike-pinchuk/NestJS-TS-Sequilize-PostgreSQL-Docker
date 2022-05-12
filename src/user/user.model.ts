import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRoles } from '../role/user-roles.model';
import { Role } from '../role/role.model';
import { Post } from '../post/post.model';

interface UserCreationAttr {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({ example: '1', description: 'ID of user' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'sobaka@gmail.com', description: "User's email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'password', description: "User's password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Is user banned?' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'rough dialog', description: 'A reasson of ban' })
  @Column({ type: DataType.STRING })
  banReasson: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];
}
