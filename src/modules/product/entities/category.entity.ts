import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Product } from './product.entity';
import { Base } from '../../base.entity';

@Entity('category')
export class Category extends Base {

  @Column()
  imgURL: string; 

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => Category, (category) => category.children, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentId' }) 
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[]

  @ManyToMany(() => Product, (product) => product.categories)
    products: Product[];
}