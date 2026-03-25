import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'abc@gmail.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'username', description: 'Tên đăng nhập' })
  username: string;

  @ApiProperty({ example: '123456', description: 'Nhớ valid pass' })
  password: string;

  @ApiProperty({ example: 'client', description: 'role', required: false })
  rolename: string;
}