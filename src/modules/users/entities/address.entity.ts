import { Entity,PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  location: string; 
  
   @Column()
  phoneNum: string; 

   @Column()
  isDefault: boolean; 

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
  
}