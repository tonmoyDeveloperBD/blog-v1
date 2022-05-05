import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-at') {

  constructor(private authService : AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('access_token'),
        ExtractJwt.fromBodyField('access_token')
      ]),
      ignoreExpiration: false,
      secretOrKey: 'at-secret',
    });
  }


  validate(payload: any){
    return payload;
  }



}
