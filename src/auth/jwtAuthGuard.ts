import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from './user.service';

@Injectable()
export class JwtAuthGuard extends PassportStrategy(Strategy) {
  constructor(private readonly authService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.NEXTAUTH_SECRET,
    });
  }
  async validate(payload: any) {
    console.log(payload);
    // TODO:
    // payload를 검증
    // 사용자 데이터베이스에서 사용자를 조회, 검증
  }
}
