import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Product } from './product.entity';


@Entity('productImage')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgURL: string; 

  @ManyToOne(() => Product, (product)=> product.images)
  product: Product;


//   @Column()
//   imgURL: string; 
  
}