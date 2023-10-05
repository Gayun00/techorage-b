import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Get('/:id')
  getArticleById(@Param('id') id: string): Article {
    return this.articlesService.getArticleById(id);
  }

  @Delete('/:id')
  deleteArticle(@Param('id') id: string): void {
    this.articlesService.deleteArticle(id);
  }

  @Patch('/:id/keywords')
  updateArticleKeyword(
    @Param('id') id: string,
    @Body('keywords') keywords: string[],
  ) {
    return this.articlesService.updateArticleKeyword(id, keywords);
  }
}
