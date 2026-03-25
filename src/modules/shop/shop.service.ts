import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { UsersService } from '../users/users.service';


@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private shopRepo: Repository<Shop>,
    private userService: UsersService,
  ) {}

async createShop(userId: number, dto: any) {
    const user = await this.userService.findOne(userId); 
    
    if (!user || user.role.rolename !== 'seller') 
      throw new ForbiddenException('Chỉ Seller mới được mở shop');
    
    const existing = await this.shopRepo.findOne({ where: { ownerId: userId } });
    if (existing) throw new BadRequestException('Bạn đã có shop rồi');

    const newShop = this.shopRepo.create({ ...dto, ownerId: userId });
    return this.shopRepo.save(newShop);
  }

 //Bổ sung mấy cái hàm ở đây.... nhớ validate đầu vô nếu có
//Làm mấy cái hàm create, tìm theo cate, theo tên ,.... ưu tiên xài find findOne,   
// hàm nào phức tạp/ Many to Many thì xài Query Builder nha
//Nhớ là mấy cái hàm create phải có id người tạo bla bla

}