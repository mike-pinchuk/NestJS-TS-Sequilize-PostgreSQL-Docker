import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorator/roles-auth.decorator';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Creating of user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Give a role to user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('role')
  async addRole(@Body() roleDto: AddRoleDto): Promise<AddRoleDto> {
    return this.userService.addRole(roleDto);
  }

  @ApiOperation({ summary: 'Give a ban' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('ban')
  async addBan(@Body() banDto: BanUserDto): Promise<User> {
    return this.userService.addBan(banDto);
  }
}
