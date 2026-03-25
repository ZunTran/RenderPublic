import { Entity, PrimaryGeneratedColumn, Column,  ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

@Entity('review')
export class Review {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vote: number; 

  @Column()
  comment: string; 

}