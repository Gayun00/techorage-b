import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
// import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.NEXTAUTH_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    // 새로운 유저의 경우 해당 에러를 발생시키지 않아야함.
    // TODO: 로직 추가 검토 후 수정
    // const { email } = payload;
    // const user: User = await this.userRepository.findOne({ where: { email } });

    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return payload;
  }
}
