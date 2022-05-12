import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';
import { RoleService } from './role.service';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ summary: 'Creating of role' })
  @ApiResponse({ status: 201, type: Role })
  @Post()
  async createRole(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(dto);
  }
  @ApiOperation({ summary: 'Getting of role' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  async getToRoleByValue(@Param('value') value: string): Promise<Role> {
    return this.roleService.getRoleByValue(value);
  }
}
