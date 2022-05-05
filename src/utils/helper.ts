import * as bcrypt from "bcrypt"
import { Injectable } from "@nestjs/common";


@Injectable()
export class Helper{

  public async toHash(any: any){
    return await bcrypt.hash(any , 10)
  }
}

