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
    if (!user) return [];
    const query = this.articleRepository.createQueryBuilder('article');

    query.where('article.userId = :id', { id: user.id });
    const articles = await query.getMany();
    if (!articles) return [];
    return articles;
  }

  async createArticle(url: string, user: User) {
    const { title, text } = await scrapArticle(url);

    await this.articleRepository.createArticle({
      id: uuidv4(),
      title,
      text,
      url,
      keywords: [],
      user,
    });
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
      return [];
    }

    const keywords = await extractKeywords(article.title);

    article.keywords = keywords;
    await this.articleRepository.save(article);
    await this.updateKeywords(keywords);
    return article;
  }
}
