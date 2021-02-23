import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskModel} from "../model/task.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  private todolistSource = new BehaviorSubject(new Array<TaskModel>());
  currentTodolist = this.todolistSource.asObservable();

  constructor(private http: HttpClient) { }

  private baseUrlApi: string = 'http://localhost:3000/';

  public directusAuthentification(): void {
    this.http.get(this.baseUrlApi + 'directus/auth').subscribe();
  }

  getAllTasks(): Observable<any> {
    return  this.http.get(this.baseUrlApi + 'todolist/all')
      .pipe( map(value => {
        return value;
    }));
  }

  getTaskByUserId(): void {}

  public setTodolist(newTodolist: Array<TaskModel>): void{
    this.todolistSource.next(newTodolist)
  }

  public createTask(task: TaskModel): void {
    this.http.post(this.baseUrlApi + 'todolist/new', task)
      .subscribe((response: any) => {
        console.log('post_res: ', response);
        this.addTaskInTodolistArray(this.buildTaskModel(response), this.todolistSource.value)
      });
  }

  public updateTask(taskId: number, moveTo: number, taskToUpdate: TaskModel): void {
    const newTodolist = this.todolistSource.value.filter( task => task.id != taskId)
    taskToUpdate.todo = (moveTo === 1);
    taskToUpdate.doing = (moveTo === 2);
    taskToUpdate.done = (moveTo === 3);
    this.http.put(`${this.baseUrlApi}todolist/edit/${taskId}`, taskToUpdate)
      .subscribe( (response: any) => {
        this.setTodolist(this.addTaskInTodolistArray(this.buildTaskModel(response), newTodolist));
        console.log('put_res: ', response);
      });
  }

  public deleteTask(taskId: number): void {
    this.http.delete(`${this.baseUrlApi}todolist/delete/${taskId}`)
      .subscribe( response => {
        const newTodolist = this.todolistSource.value.filter( task => task.id != response)
        this.setTodolist(newTodolist);
        console.log('delete_res: ', response)
      });
  }

  public addTaskInTodolistArray(task: TaskModel, taskModelArray: Array<TaskModel>): Array<TaskModel>{
    let newTodolist = taskModelArray;
    newTodolist.push(task);
    return newTodolist;
  }

  public buildTaskModel(response: any): TaskModel {
    return {
      id: response.id,
      content: response.content,
      todo: response.todo,
      doing: response.doing,
      done: response.done,
      createdOn: response.createdOn
    }
  }
}
