import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { ArticlesModule } from './articles/articles.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ArticlesModule],
})
export class AppModule {}
