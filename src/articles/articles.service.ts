import { CreateArticleDto } from './dto/create-article.dto';
import { Injectable } from '@nestjs/common';
import { Article } from './articles.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArticlesService {
  private articles: Article[] = [];

  getAllArticles(): Article[] {
    return this.articles;
  }

  createArticle(createArticleDto: CreateArticleDto) {
    const { title, text, url } = createArticleDto;
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

  getArticleById(id: string): Article {
    return this.articles.find((article) => article.id == id);
  }

  deleteArticle(id: string): void {
    this.articles = this.articles.filter((article) => article.id !== id);
  }

  updateArticleKeyword(id: string, keywords: string[]) {
    const article = this.getArticleById(id);
    article.keywords = keywords;
    return article;
  }
}
