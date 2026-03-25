import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('product_in_cart')
export class ProductInCart {

  @PrimaryGeneratedColumn()
  id: number; 

  @ManyToOne(()=>Cart, (cart) => cart.productsInCart)
    cart: Cart;
}