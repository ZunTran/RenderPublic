import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { PaymentMethod } from './paymentMethod.entity';
import { Voucher } from './voucher.entity';
import { PaymentStatus } from './payment-status.enum';
import { ShopOrder } from './shopOrder.entity';

@Entity('order')
export class Order{
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
totalPrice: number;

  @Column()
  createAt: string;

  @Column()
  shippingAddress: string;

  @Column()
  receiveName: string;

  @Column()
  receivePhone: string;
  
    @Column()
  discountMoney: number;

  @Column({
      type: 'enum',
      enum: PaymentStatus,
      default: PaymentStatus.PENDING, 
    })
    status:PaymentStatus;
  
   

  @ManyToOne(()=>PaymentMethod, (paymentMethod) => paymentMethod.orders)
    paymentMethod: PaymentMethod;

  @ManyToOne(() => Voucher, (voucher) => voucher.orders)
    voucher: Voucher;

  @OneToMany(()=>ShopOrder, (shopOrder) => shopOrder.order)
  shopOrders: ShopOrder[];
}