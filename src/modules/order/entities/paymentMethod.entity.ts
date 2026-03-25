import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Base } from '../../base.entity';
import { Order } from './order.entity';

@Entity('payment_method')
export class PaymentMethod extends Base {
    @OneToMany(() => Order, (order) => order.paymentMethod)
    orders: Order[];
}