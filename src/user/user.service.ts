import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from '../role/role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async addRole(roleDto: AddRoleDto): Promise<AddRoleDto> {
    const user = await this.userRepository.findByPk(roleDto.userId);
    const role = await this.roleService.getRoleByValue(roleDto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return roleDto;
    }
    throw new HttpException('User or role did not found', HttpStatus.NOT_FOUND);
  }

  async addBan(banDto: BanUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(banDto.userId);
    if (!user) {
      throw new HttpException('Userd did not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReasson = banDto.banReasson;
    await user.save();
    return user;
  }
}
