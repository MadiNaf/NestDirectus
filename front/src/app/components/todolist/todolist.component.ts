import { Component, OnInit } from '@angular/core';
import {TodolistService} from '../../services/todolist.service';
import {TaskModel} from '../../model/task.model';
import {UserModel} from '../../model/user.model';
import {StoreService} from '../../services/store.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  public newTaskContent: string = '';
  public todolist: Array<TaskModel> = new Array<TaskModel>();
  public user: UserModel = new UserModel();

  constructor(private todolistService: TodolistService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.currentUser.subscribe( currentUser => this.user = currentUser);
    this.getTodolist();
  }

  public getTodolist(): void{
    this.todolistService.currentTodolist
      .subscribe(todolist => this.todolist = todolist);
  }

  addTask(taskContent: string): void{
    console.log('add')
    const task: TaskModel = {
      id: 0,
      content: taskContent,
      createdOn: '',
      updatedOn: '',
      todo: true,
      doing: false,
      done: false,
      userId: ''
    }

    this.newTaskContent = '';
    this.todolistService.createTask(task)
  }

  formtToTaskModel(item: any): TaskModel {
    return {
      id: item.id,
      content: item.content,
      createdOn: item.createdOn,
      updatedOn: item.updatedOn,
      todo: item.todo,
      doing: item.doing,
      done: item.done,
      userId: item.userId
    }
  }
}
