import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { User } from './user.model';
import { Role } from '../role/role.model';
import { UserService } from './user.service';
import { UserRoles } from '../role/user-roles.model';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../post/post.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
