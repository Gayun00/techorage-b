import { IsNotEmpty } from 'class-validator';

export class CreateKeywordDto {
  @IsNotEmpty()
  keyword: string;

  @IsNotEmpty()
  count: number;
}
