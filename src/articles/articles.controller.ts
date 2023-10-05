import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './articles.model';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get('/')
  getAllArticles(): Article[] {
    return this.articlesService.getAllArticles();
  }

  @Post('')
  createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.createArticle(createArticleDto);
  }

  @Get(':/id')
  getArticleById(@Param('id') id: string): Article {
    console.log(id, 'id');
    return this.articlesService.getArticleById(id);
  }
}
