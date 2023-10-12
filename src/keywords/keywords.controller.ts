import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { KeywordsService } from './Keywords.service';
import { Keyword } from './keyword.entity';

@Controller('keywords')
export class KeywordsController {
  constructor(private keywordsService: KeywordsService) {}

  @Get('/')
  getAllKeywords(): Promise<Keyword[]> {
    return this.keywordsService.getAllKeywords();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createKeyword(@Body() { keywords }: { keywords: string[] }) {
    return this.keywordsService.createKeyword(keywords);
  }

  @Delete('/:id')
  deleteKeyword(@Param() { id }: { id: string }) {
    return this.keywordsService.deleteKeyword(id);
  }
}
