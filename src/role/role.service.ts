import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.create(dto);
  }

  async getRoleByValue(value: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { value } });
  }
}
