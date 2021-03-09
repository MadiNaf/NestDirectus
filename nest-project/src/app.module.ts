import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodolistModule } from './todolist/todolist.module';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [TodolistModule, UserModule, BoardModule, AvatarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
