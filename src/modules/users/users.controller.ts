import { Controller, Post, Body, UseGuards,ParseIntPipe, Param,Get, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { AddressDto } from './dto/address.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetUser } from './get-user.decorator';
import { UpdateProfileDto } from './dto/update-user.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('addresses')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getAddresses(@GetUser('userId') userId: number) {
    console.log(`Đang lấy địa chỉ cho user id: ${userId}`);   
    const addresses = await this.usersService.getAddresses(userId);
    return addresses
  }

  

  @Post('address')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth() 
  async addAddress(@Body() addressDto:AddressDto , @GetUser('userId') userId: number) {
    console.log(`Đang thêm địa chỉ cho user id: ${userId}`);

    const newAddress = await this.usersService.addAddress(userId, addressDto);

    return {
      message: 'Thêm địa chỉ thành công!',
      data: newAddress,
    };
  }
 
  @Get('address/:addressId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getAddressById(
    @GetUser('userId') userId: number,
    @Param('addressId', ParseIntPipe) addressId: number
  ) {
    const address = await this.usersService.getOneAddress(userId, addressId);
    if (!address) {
      return {
        message: 'Không tìm thấy địa chỉ',
      };
    } 
    return {
      message: 'Lấy thành công',
      data: address
    };  
  }


  @Patch('address/:addressId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async updateAddress(@GetUser('userId') userId: number,
  @Param('addressId', ParseIntPipe) addressId: number,
  @Body() updateAddressDto: UpdateAddressDto
  ) {
    const updatedAddress = await this.usersService.updateAddress(
      userId, 
      addressId, 
      updateAddressDto
    );
    return {
      message: 'Cập nhật địa chỉ thành công!',
      data: updatedAddress,
    };
}

  @Delete('address/:addressId') 
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async deleteAddress(
    @GetUser('userId') userId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
  ) {
    await this.usersService.deleteAddress(userId, addressId);
    
    return {
      message: 'Xóa địa chỉ thành công',
    };
  }




  // @Get('profile')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Lấy thông tin profile hiện tại' })
  // async getProfile(@GetUser('userId') userId: number) {
  //   return await this.usersService.findByEmailOrUsername(undefined, undefined, userId); 
  //   // Ông giáo nhớ chỉnh lại hàm find này để nhận cả ID nhen
  // }

  // @Patch('profile')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Cập nhật thông tin cá nhân (Username, Email, Password, Address)' })
  // async updateProfile(
  //   @GetUser('userId') userId: number, 
  //   @Body() updateDto: UpdateUserDto
  // ) {
  //   console.log(`Đang "trùng tu" profile cho user id: ${userId}`);
    
  //   const updatedUser = await this.usersService.updateProfile(userId, updateDto);

  //   return {
  //     message: 'Cập nhật profile thành công nhen ông giáo!',
  //     data: updatedUser,
  //   };
  // }


}