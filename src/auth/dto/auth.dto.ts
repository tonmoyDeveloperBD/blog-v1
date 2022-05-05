import { IS_NOT_EMPTY, IsEmail, IsNotEmpty, Length } from "class-validator";


export class AuthDto{

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
