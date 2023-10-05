import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './articles.model';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get('/')
  getAllArticles(): Article[] {
    return this.articlesService.getAllArticles();
  }
}
