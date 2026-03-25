import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/productImage.entity';
import { ProductVariant } from './entities/productVariant.entity';
import { Review } from './entities/review.entity';
import { Category } from './entities/category.entity';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductVariant, ProductImage,Review, Category])],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}