import { Prop } from "@typegoose/typegoose";
import { IsEmail, Length } from "class-validator";

export class UserEntity{

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
  public password: string;

  @Prop({required: false})
    public hash: string;

}
