import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserBuilder } from '../users/user.builder';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const userExist = await this.userService.findByEmailOrUsername(dto.email, dto.username);
    if (userExist) throw new BadRequestException('Email/ username đã tồn tại');

    const role = await this.userService.findRole(dto.rolename );
    const allowedRoles = ['client', 'seller'];
    if (!role || !allowedRoles.includes(dto.rolename)) throw new BadRequestException('Role không hợp lệ');
    
    const hashedPass = await bcrypt.hash(dto.password, 10);
    const newUser = new UserBuilder().setEmail(dto.email)
        .setUsername(dto.username)
        .setPassword(hashedPass)
        .setRole(role)
        .setAvatar()
        .build();

    return await this.userService.create(newUser);
  }

  async login(loginstr: string, pass: string) {
    const user = await this.userService.findByEmailOrUsername(loginstr,loginstr);
    if (!user) throw new UnauthorizedException('Sai tên đăng nhập');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Sai mật khẩu');

    const payload = { 
        sub: user.id, 
        username: user.username,
        email: user.email, 
        role: user.role.rolename };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}