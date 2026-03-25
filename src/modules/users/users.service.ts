import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Address } from './entities/address.entity';
import { AddressDto } from './dto/address.dto';
import { UserBuilder } from './user.builder';
import * as bcrypt from 'bcrypt'; 
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,

    @InjectRepository(Role) private roleRepo: Repository<Role>,

    @InjectRepository(Address) private addressRepo: Repository<Address>,

  ) {}

  async create(data: Partial<User>) {
    return this.userRepo.save(data);
  }

  async findByEmailOrUsername(email?: string, username?: string) {
  return this.userRepo.findOne({
    where: [
      { email: email },      
      { username: username } 
    ],
    relations: ['role'],
    select: ['id', 'email', 'username', 'password']
    });
  }
  async findRole(rolename: string) {
    return this.roleRepo.findOne({ where: { rolename } });
  }

  findByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }

  async addAddress(userId: number, addressDto: AddressDto) {
    const user = await this.userRepo.findOne({ 
    where: { id: userId },
    relations: ['role'],
    select: ['id', 'role'] 
  });
  if (!user) {
    throw new NotFoundException('Không tìm thấy người dùng!');
  }

    const addressCount = await this.addressRepo.count({ where: { user: { id: userId } } });
    if (user.role.rolename === 'seller' && addressCount >= 1) {
    throw new BadRequestException('Tài khoản Seller chỉ được tối đa 1 địa chỉ lấy hàng');
  }
    const newAddress = this.addressRepo.create({
      ...addressDto,      
      user: { id: userId },
      isDefault: addressCount === 0
    });
    return await this.addressRepo.save(newAddress);
  }

  async getAddresses(userId: number): Promise<Address[]> {
    return await this.addressRepo.find({
      where: { user: { id: userId } },

      order: { 
      isDefault: 'DESC'
    },

    });
  }

  async getOneAddress(userId: number, addressId: number): Promise<Address> {
    const address = await this.addressRepo.findOne({
      where: { 
        id: addressId, 
        user: { id: userId }
      }
    });
    if (!address) {
      throw new NotFoundException('Địa chỉ không tồn tại');
    }
    return address;
  }

  async updateAddress(userId: number, addressId: number, updateDto: UpdateAddressDto) {
    const address = await this.addressRepo.findOne({
      where: { id: addressId, user: { id: userId } }
    });

    if (!address) {
      throw new NotFoundException('Địa chỉ không tồn tại');
    }

    Object.assign(address, updateDto);
    return this.addressRepo.save(address);
  }

  async deleteAddress(userId: number, addressId: number) {
    const address = await this.addressRepo.findOne({
      where: { id: addressId, user: { id: userId } }
    });
    if (!address) throw new NotFoundException('Không tìm thấy địa chỉ');
    return this.addressRepo.remove(address);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) throw new NotFoundException(`Không tìm thấy user id ${id}`);
    
    return user;
  }
}