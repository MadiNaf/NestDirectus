import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';

@Module({
  providers: [TodolistService],
  controllers: [TodolistController]
})
export class TodolistModule {

}
