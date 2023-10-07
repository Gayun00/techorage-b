import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { ArticlesModule } from './articles/articles.module';
import { Module } from '@nestjs/common';
import { KeywordsModule } from './keywords/keywords.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ArticlesModule,
    KeywordsModule,
  ],
})
export class AppModule {}
