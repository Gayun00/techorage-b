import { IsNotEmpty } from 'class-validator';
import { User } from 'src/auth/user.entity';

export class CreateArticleDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  keywords: string[];

  @IsNotEmpty()
  user: User;
}
