import { Injectable } from '@nestjs/common';
import { Article } from './articles.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArticlesService {
  private articles: Article[] = [];

  getAllArticles(): Article[] {
    return this.articles;
  }

  createArticle(title: string, text: string, url: string) {
    const article: Article = {
      id: uuidv4(),
      title,
      text,
      url,
      keywords: [],
    };
    this.articles.push(article);
    return article;
  }
}
