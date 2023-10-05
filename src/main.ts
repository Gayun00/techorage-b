import { NestFactory } from '@nestjs/core';
import { ArticlesModule } from './articles/articles.module';

async function bootstrap() {
  const app = await NestFactory.create(ArticlesModule);
  await app.listen(6000);
}
bootstrap();
