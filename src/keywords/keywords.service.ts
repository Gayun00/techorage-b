import { Injectable } from '@nestjs/common';
// import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Keyword } from './keyword.entity';
import { KeywordRepository } from './keyword.repository';

@Injectable()
export class KeywordsService {
  constructor(
    @InjectRepository(KeywordRepository)
    private keywordRepository: KeywordRepository,
  ) {}

  getAllKeywords(): Promise<Keyword[]> {
    return this.keywordRepository.find();
  }

  async createKeyword(keywords: string[]) {
    for (const keyword of keywords) {
      let existingKeyword = await this.keywordRepository.findOne({
        where: { keyword },
      });

      if (existingKeyword) {
        existingKeyword.count += 1;
      } else {
        existingKeyword = this.keywordRepository.create({ keyword, count: 0 });
      }
      await this.keywordRepository.save(existingKeyword);
    }
    return { message: 'keyword updated' };
  }
}
