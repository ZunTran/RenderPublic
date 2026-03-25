import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';


export class UpdateProfileDto extends PartialType(RegisterDto) {
  
  // Các trường của RegisterDto đã tự động có ở đây dưới dạng optional
  
  // Thêm các trường mới CÓ lúc update profile
  @ApiProperty({ 
    example: 'https://cloudinary.com/user/avatar123.jpg', 
    description: 'Ava Cloudinary',
    required: false 
  })
  avatar?: string;
 
}