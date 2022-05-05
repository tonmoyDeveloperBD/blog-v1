import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypegooseModule } from "nestjs-typegoose";
import { UserEntity } from "./user.entity";

@Module({
  imports: [UserModules, TypegooseModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModules{}
