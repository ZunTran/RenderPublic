import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'user@gmail.com', 
    description: 'Nhập Email hoặc Username để đăng nhập' 
  })
  loginstr: string;

  @ApiProperty({ 
    example: '123456', 
    description: 'Mật khẩu' 
  })
  password: string;
}