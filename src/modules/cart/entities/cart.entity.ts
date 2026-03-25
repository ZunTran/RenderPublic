import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { ProductInCart } from './productInCart.entity';

@Entity('cart')
export class Cart{

  @PrimaryGeneratedColumn()
  id: number; 

  @OneToMany(()=> ProductInCart , (productInCart) => productInCart.cart)
    productsInCart: ProductInCart[];
}