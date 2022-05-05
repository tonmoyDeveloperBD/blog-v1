import {
  Body, Controller, Get, Post, UseGuards, ValidationPipe,
  Request, HttpStatus, HttpCode
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "../user/dto/user.dto";
import { LoginDto } from "../user/dto/login.dto";

import { AuthGuard } from "@nestjs/passport";
import { Authenticated } from "../utils/common/authenticated";
import { JwtAuthGuard } from "./guard/JwtAuthGuard";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}


  @Post('signin')
  signIn(@Body(new ValidationPipe()) loginDto : LoginDto){
    return this.authService.login(loginDto)
  }


  @Post('signup')
  signUp(@Body(new ValidationPipe()) userDto :UserDto){
    return this.authService.registration(userDto)
  }


  @Post('logout')
  logout(){
    return this.authService.logout()
  }


  @UseGuards(JwtAuthGuard)
  @Get('refresh')

  refreshToken(@Request() req){
    console.log(req.user);
    return req.user //this.authService.refreshToken(req)
  }




}
