import { DataSource, Repository } from 'typeorm';
import { Article } from './article.entity';
import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  async createArticle(article: CreateArticleDto) {
    const createdArticle: CreateArticleDto = await this.create(article);
    await this.save(createdArticle);
  }
}
