import { CreateArticleDto } from './dto/create-article.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const article = this.articles.find((article) => article.id == id);
    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }

  deleteArticle(id: string): void {
    const found = this.getArticleById(id);

    if (!found) {
      throw new NotFoundException();
    }

    this.articles = this.articles.filter((article) => article.id !== found.id);
  }

  updateArticleKeyword(id: string, keywords: string[]) {
    const article = this.getArticleById(id);
    article.keywords = keywords;
    return article;
  }
}
