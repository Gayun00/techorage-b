import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  keywords: string[];
}
