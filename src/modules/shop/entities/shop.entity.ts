import { Entity, OneToMany, OneToOne,JoinColumn,Column } from 'typeorm';
import { Base } from '../../base.entity';

@Entity('shop')
export class Shop extends Base {
    @Column()
    shopId: number;
    
    @Column()
    shopName: string;

    @Column()
    ownerId: number;
    // @OneToMany('product', (product: any) => product.shop)
    // products: any[];
}