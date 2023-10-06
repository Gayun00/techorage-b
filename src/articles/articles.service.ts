import { CreateArticleDto } from './dto/create-article.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './articles.model';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { scrapArticle } from 'src/services/scrapper';

@Injectable()
export class ArticlesService {
  private articles: Article[] = [];

  constructor(
    @InjectRepository(ArticleRepository)
    private articleRepository: ArticleRepository,
  ) {}

  getAllArticles(): Article[] {
    return this.articles;
  }

  async createArticle(url: string) {
    const { title, text } = await scrapArticle(url);
    const article: CreateArticleDto = this.articleRepository.create({
      id: uuidv4(),
      title,
      text,
      url,
      keywords: [],
    });

    await this.articleRepository.save(article);
    return article;
  }

  async getArticleById(id: string) {
    // TODO; fix issue
    // const article = await this.articleRepository.findOne(id);
    const article = this.articles.find((article) => article.id == id);
    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }

  async deleteArticle(id: string) {
    const result = await this.articleRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException("Can't find the article");
    }
  }

  async updateArticleKeyword(id: string, keywords: string[]) {
    const article = await this.getArticleById(id);
    article.keywords = keywords;
    return article;
  }
}
