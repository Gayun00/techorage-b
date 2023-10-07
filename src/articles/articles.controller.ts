import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './articles.model';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get('/')
  getAllArticles(): Promise<Article[]> {
    return this.articlesService.getAllArticles();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createArticle(@Body() { url }: { url: string }) {
    return this.articlesService.createArticle(url);
  }

  @Delete('/:id')
  deleteArticle(@Param('id') id: string): Promise<void> {
    return this.articlesService.deleteArticle(id);
  }

  @Patch('/:id/keywords')
  updateArticleKeyword(@Param('id') id: string) {
    return this.articlesService.updateArticleKeyword(id);
  }
}
