import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { LoginDto } from "./dto/login.dto";


@Controller('user')
export class UserController{

  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser() : any{
    return this.userService.getAllUser()
  }

  @Post('registration')
  createAccount(@Body(new ValidationPipe()) userDto :UserDto) : any {
    return this.userService.registration(userDto);
  }

  @Post('login')
  login(@Body(new ValidationPipe()) loginDto : LoginDto ){
    return  this.userService.login(loginDto)
  }

}
