import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Product } from './product.entity';
import { Base } from '../../base.entity';

@Entity('productVariant')
export class ProductVariant extends Base {

  @Column()
  price: number; 

  @Column()
  stockQuantity: number; 

  @Column()
  imgURL: string; 

  @Column()
  sku: string; 

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;

}