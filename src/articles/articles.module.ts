import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticleRepository } from './article.repository';
import { KeywordRepository } from 'src/keywords/keyword.repository';
import { AuthModule } from 'src/auth/user.module';

@Module({
  imports: [AuthModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticleRepository, KeywordRepository],
})
export class ArticlesModule {}
