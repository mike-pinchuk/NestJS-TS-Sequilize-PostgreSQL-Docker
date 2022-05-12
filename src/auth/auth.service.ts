import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'ERROR: USER WITH THIS EMAIL EXIST',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPasword = await bcrypt.hash(userDto.password, 5);
    const newUser = await this.userService.createUser({
      ...userDto,
      password: hashedPasword,
    });
    return this.generateToken(newUser);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const comparePasswords = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && comparePasswords) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Wrong credentials' });
  }
}
