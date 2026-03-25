import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { ShopService } from './shop.service';
import { ProductModule } from '../product/product.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shop]),
  UsersModule,
  ProductModule

],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}