import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  url: string;
}
