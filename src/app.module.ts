import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { ArticlesModule } from './articles/articles.module';
import { Module } from '@nestjs/common';
import { KeywordsModule } from './keywords/keywords.module';
import { AuthModule } from './auth/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ArticlesModule,
    KeywordsModule,
    AuthModule,
  ],
})
export class AppModule {}
