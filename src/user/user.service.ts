import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { InjectModel } from "nestjs-typegoose";
import { UserEntity } from "./user.entity";
import { ReturnModelType } from "@typegoose/typegoose";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";


@Injectable()
export class UserService {

  constructor(
    @InjectModel(UserEntity) private readonly userEntity: ReturnModelType<typeof UserEntity>

  ) {}

  async getAllUser(){
    return {}
  }


  async registration(userDto : UserDto){
    let count = await this.userEntity.countDocuments({ email: userDto.email }).limit(1)
    if (count === 0){
      userDto.password = await  bcrypt.hash(userDto.password, 10)
      return  await this.userEntity.create(userDto)
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

}
