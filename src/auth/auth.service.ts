import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { InjectModel } from "nestjs-typegoose";
import { AuthEntity } from "./entity/auth.entity";
import { mongoose, ReturnModelType } from "@typegoose/typegoose";
import { UserEntity } from "../user/user.entity";
import { UserDto } from "../user/dto/user.dto";
import { LoginDto } from "../user/dto/login.dto";
import * as bcrypt from "bcrypt"
import { Helper } from "../utils/helper";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(UserEntity)
    private readonly userEntity: ReturnModelType<typeof UserEntity>,
    private readonly helper : Helper,
    private readonly jwtService : JwtService
  ) {}



   async registration(userDto : UserDto){
     console.log(userDto);
    let count = await this.userEntity.countDocuments({ email: userDto.email }).limit(1)
    if (count === 0){
      userDto.password = await this.helper.toHash(userDto.password) //await  bcrypt.hash(userDto.password, 10)
      let data =  await this.userEntity.create(userDto)
      const tokens = await this.getTokens(data._id,data.email)
      await this.updateHash(data._id, tokens['refresh_token'])
      return tokens
    }else {
      throw new HttpException('user already exist', HttpStatus.NOT_ACCEPTABLE)
    }
  }

  async login(loginDto : LoginDto){

    let findUser = await this.userEntity.find({email: loginDto.email});

    if (findUser.length ===0) throw new HttpException('User not found',HttpStatus.NOT_FOUND)

    const isMatch = await bcrypt.compare(loginDto.password, findUser[0].password);
    console.log(isMatch);
    return isMatch;

  }

  async logout(){

  }


  async refreshToken(req: any){
    console.log(req['user']);
  }

  async getTokens(userId: string, email: string){

   /* const payload = { username: email, sub: userId };

    return {
      access_token: this.jwtService.sign(payload),
    };*/

    const [at, rt] = await Promise.all([
      this.jwtService.sign({
        sub: userId,email
      },{
        secret: 'at-secret',
        expiresIn: 60
      }),
      this.jwtService.sign({
        sub: userId,email
      },{
        secret: 'rt-secret',
        expiresIn: 60 * 5
      })

    ])
    return {
      access_toke: at,
      refresh_token : rt
    }
  }

  async updateHash(userId : string ,hash: string){
    await this.userEntity.findOneAndUpdate({_id: new mongoose.Types.ObjectId(userId) }, {
      hash: hash
    })
  }

}
