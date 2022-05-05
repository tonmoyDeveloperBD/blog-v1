import { PassportStrategy } from "@nestjs/passport";

import { AuthService } from "../auth.service";
import { Strategy ,ExtractJwt} from "passport-jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-rt') {

  constructor(private authService : AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: 'rt-secret',
    });
  }

  validate(req: Request, payload: any){
    return payload;
  }



}
