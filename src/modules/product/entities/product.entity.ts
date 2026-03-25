import { Entity, PrimaryGeneratedColumn, Column,  ManyToMany, JoinTable, OneToMany,ManyToOne} from 'typeorm';
import { Category } from './category.entity';
import { ProductImage } from './productImage.entity';
import { Base } from '../../base.entity';
import { ProductVariant } from './productVariant.entity';
import { ProductStatus } from './product-status.enum';
@Entity('product')
export class Product extends Base {
  @Column()
  description: string; 

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.COMINGSOON, 
  })
  status: ProductStatus;

  
  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images: ProductImage[];

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
    categories: Category[];
 
  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product)
  variants: ProductVariant[];

  @ManyToOne('shop', (shop: any) => shop.products)
  shop: any;
}