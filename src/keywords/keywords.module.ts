import { Module } from '@nestjs/common';
import { KeywordsController } from './Keywords.controller';
import { KeywordsService } from './Keywords.service';
import { KeywordRepository } from './keyword.repository';

@Module({
  controllers: [KeywordsController],
  providers: [KeywordsService, KeywordRepository],
})
export class KeywordsModule {}
