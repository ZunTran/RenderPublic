import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Base } from '../../base.entity';
import { Order } from './order.entity';

@Entity('voucher')
export class Voucher extends Base {
    @Column()
    quantity: number;

    @Column()
    maxDisPercent: number;

    @Column()
    minValueApply: number;

    @Column()
    maxDisMoney: number;

    @OneToMany(() => Order, (order) => order.voucher)
    orders: Order[];
}