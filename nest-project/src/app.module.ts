import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodolistModule } from './todolist/todolist.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TodolistModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
