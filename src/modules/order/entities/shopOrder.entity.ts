import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

import { OrderStatus } from './order-status.enum';
import { Order } from './order.entity';
import { OrderDetail } from './orderDetail.entity';

@Entity('order')
export class ShopOrder{
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  totalPrice: number;

  @Column({
      type: 'enum',
      enum: OrderStatus,
      default:  OrderStatus.PENDING, 
    })
    status: OrderStatus;
  
    @ManyToOne(()=>Order, (order) => order.shopOrders)
    order: Order;

    @OneToMany(()=>OrderDetail, (orderDetail) => orderDetail.shopOrder)
    orderDetails: OrderDetail[];
}