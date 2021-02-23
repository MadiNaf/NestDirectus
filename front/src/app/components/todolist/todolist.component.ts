import { Component, OnInit } from '@angular/core';
import {TodolistService} from "../../services/todolist.service";
import {TaskModel} from "../../model/task.model";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  public newTaskContent: string = '';
  public todolist: Array<TaskModel> = new Array<TaskModel>();

  constructor(private todolistService: TodolistService) { }

  ngOnInit(): void {
    this.todolistService.directusAuthentification();
    this.todolistService.getAllTasks().subscribe( value => {
      let taskList: TaskModel[] = new Array<TaskModel>();
      value.forEach((item: any) => {
        taskList.push(this.formtToTaskModel(item))

      })
      this.todolistService.setTodolist(taskList);
    });
    this.getTodolist();
  }

  addTask(taskContent: string): void{
    console.log('add')
    const task: TaskModel = {
      id: 0,
      content: taskContent,
      createdOn: '',
      todo: true,
      doing: false,
      done: false
    }

    this.newTaskContent = '';
    this.todolistService.createTask(task)
  }

  getTodolist(): void{
    this.todolistService.currentTodolist
      .subscribe(todolist => this.todolist = todolist);
  }

  formtToTaskModel(item: any): TaskModel {
    return {
      id: item.id,
      content: item.content,
      createdOn: item.createdOn,
      todo: item.todo,
      doing: item.doing,
      done: item.done
    }
  }
}
