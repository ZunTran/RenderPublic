import { PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}