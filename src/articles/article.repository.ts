import { DataSource, Repository } from 'typeorm';
import { Article } from './article.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }
}
