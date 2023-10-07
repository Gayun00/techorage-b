import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Keyword extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  keyword: string;

  @Column()
  count: number;
}
