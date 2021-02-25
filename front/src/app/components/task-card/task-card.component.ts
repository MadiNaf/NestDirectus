import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from '../../model/task.model';
import { TodolistService } from '../../services/todolist.service';
import { UserModel } from '../../model/user.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {

  @Input()
  public task: TaskModel | null = null;

  @Input()
  public user: UserModel = new UserModel();

  constructor(private todolistService: TodolistService) { }

  ngOnInit(): void {}

  moveToTodo(taskId: number, task: TaskModel): void {
    this.todolistService.updateTask(taskId, 1, task)
    console.log('move to todo: ', taskId)
  }
  moveToInProgress(taskId: number, task: TaskModel): void {
    this.todolistService.updateTask(taskId, 2, task)
    console.log('move to InProgress: ', taskId)
  }
  moveToDone(taskId: number, task: TaskModel): void {
    this.todolistService.updateTask(taskId, 3, task)
    console.log('move to done: ', taskId)
  }

  deleteTask(taskId: number): void {
    this.todolistService.deleteTask(taskId)
  }
}
