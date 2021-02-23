import { Test, TestingModule } from '@nestjs/testing';
import { TodolistController } from './todolist.controller';

describe('TodolistController', () => {
  let controller: TodolistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodolistController],
    }).compile();

    controller = module.get<TodolistController>(TodolistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
