import { CreateArticleDto } from './dto/create-article.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './articles.model';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { scrapArticle } from 'src/services/scrapper';
import { KeywordRepository } from 'src/keywords/keyword.repository';
import { extractKeywords } from 'src/services/openai';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleRepository)
    private articleRepository: ArticleRepository,

    @InjectRepository(KeywordRepository)
    private keywordRepository: KeywordRepository,
  ) {}

  async getAllArticles(user: User): Promise<Article[]> {
    const query = this.articleRepository.createQueryBuilder('article');

    query.where('article.email = :email', { email: user.email });
    const articles = await query.getMany();
    return articles;
  }

  async createArticle(url: string, user: User) {
    const { title, text } = await scrapArticle(url);
    const article: CreateArticleDto = this.articleRepository.create({
      id: uuidv4(),
      title,
      text,
      url,
      keywords: [],
      user,
    });

    await this.articleRepository.save(article);
    return article;
  }

  async deleteArticle(id: string) {
    const result = await this.articleRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException("Can't find the article");
    }
  }

  async updateKeywords(keywords: string[]) {
    for (const keyword of keywords) {
      let existingKeyword = await this.keywordRepository.findOne({
        where: { keyword },
      });

      if (existingKeyword) {
        existingKeyword.count += 1;
      } else {
        existingKeyword = this.keywordRepository.create({ keyword, count: 0 });
      }
      await this.keywordRepository.save(existingKeyword);
    }
    return { message: 'keyword updated' };
  }

  async updateArticleKeyword(id: string) {
    const article = await this.articleRepository.findOne({ where: { id } });

    if (!article) {
      throw new Error(`Article with id ${id} not found`);
    }

    const keywords = await extractKeywords(article.title);

    article.keywords = keywords;
    await this.articleRepository.save(article);
    await this.updateKeywords(keywords);
    return article;
  }
}
