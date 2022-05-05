import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserDto{
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  phone_number : string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 15)
  password: string;

  hash: string;

}
