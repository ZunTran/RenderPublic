import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne, OneToOne } from 'typeorm';
import { Role } from './role.entity';
import { Address } from './address.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  

  @Column({ unique: true })
  email: string;

  @Column({select: false})
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Address, (address) => address.user, { 
    cascade: true, 
    onDelete: 'CASCADE' 
  })
  addresses: Address[];

}