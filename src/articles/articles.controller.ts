import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './articles.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';

@Controller('articles')
@UseGuards(JwtAuthGuard)
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get('/')
  getAllArticles(@GetUser() user: User): Promise<Article[]> {
    return this.articlesService.getAllArticles(user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createArticle(@Body() { url }: { url: string }, @GetUser() user: User) {
    return this.articlesService.createArticle(url, user);
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
