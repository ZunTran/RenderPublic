import { Shop } from 'src/modules/shop/entities/shop.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { ShopOrder } from './shopOrder.entity';


@Entity('order')
export class OrderDetail{
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  quantity: number;

  @Column()
  priceAtPurchase: number;

  @Column()
  productVariantNameAtPurchase: string;

  @Column()
  skuAtPurchase: string;
  
  @ManyToOne(()=>ShopOrder, (shopOrder) => shopOrder.orderDetails)
    shopOrder: ShopOrder;
}