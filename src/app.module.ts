import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from "./blog/blog.module";
import { TypegooseModule } from "nestjs-typegoose";
import "dotenv/config"
import { UserModules } from "./user/user.modules";

@Module({
  imports: [
    TypegooseModule.forRoot(process.env.DB_CONFIG),
    AuthModule,
    BlogModule,
    UserModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
