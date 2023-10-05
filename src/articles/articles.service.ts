import { Injectable } from '@nestjs/common';
import { Article } from './articles.model';
// import { uuid } from 'uuid';

@Injectable()
export class ArticlesService {
  private articles: Article[] = [];

  getAllArticles(): Article[] {
    return this.articles;
  }
}
