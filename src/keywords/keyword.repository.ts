import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Keyword } from './keyword.entity';

@Injectable()
export class KeywordRepository extends Repository<Keyword> {
  constructor(dataSource: DataSource) {
    super(Keyword, dataSource.createEntityManager());
  }
}
