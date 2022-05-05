import {Prop} from "@typegoose/typegoose"
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class AuthEntity {

  @Prop({required: true})
  public firstname: string;

  @Prop({required: true})
  public lastname: string;

  @Prop({required: true})
  public phone_number : string;

  @Prop({required: true})
  @IsEmail()
  public email: string;

  @Prop({required: true})
  @Length(6, 15)
  public password: string;

  @Prop({required: false})
  public hash: string

}
