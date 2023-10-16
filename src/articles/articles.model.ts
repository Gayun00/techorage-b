import { User } from 'src/auth/user.entity';

export interface Article {
  id: string;
  title: string;
  text: string;
  url: string;
  keywords: string[];
  user: User;
}
