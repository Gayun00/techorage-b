import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './articles.model';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get('/')
  getAllArticles(): Article[] {
    return this.articlesService.getAllArticles();
  }

  @Post('')
  createArticle(
    @Body('title') title: string,
    @Body('text') text: string,
    @Body('url') url: string,
  ) {
    return this.articlesService.createArticle(title, text, url);
  }
}
