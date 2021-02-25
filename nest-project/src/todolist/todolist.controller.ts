import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TaskModel } from '../model/task.model';

@Controller('todolist')
export class TodolistController {
    constructor(private readonly todolistService: TodolistService) {}

    @Get('all')
    getAll(): Promise<Array<TaskModel>> {
        return this.todolistService.getAllTasks();
    }

    // getByStat(): void {}

    @Post('new')
    addTask(@Body() task: TaskModel): Promise<TaskModel> {
        return this.todolistService.createTask(task);
    }

    @Put('edit/:id')
    updateTask(@Param('id') id: string, @Body() taskToUpdate: TaskModel): Promise<TaskModel> {
        return this.todolistService.editeTask(taskToUpdate, id);
    }

    @Delete('delete/:id')
    deleteTask(@Param('id') id: string): string {
        return this.todolistService.deleteTask(id);
    }

    @Get('task')
    findById(@Query() query): Promise<any> {
        return this.todolistService.findTodolistById(query);
    }
}
