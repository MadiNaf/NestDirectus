import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskModel } from '../model/task.model';
import { map } from 'rxjs/operators';
import { BoardModel } from '../model/board.model';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private readonly URL_BASE: string = 'http://localhost:3000/';
  public readonly TODOLIST_API: string = "todolist/";
  public readonly BOARD_API: string = "board/";

  private todolistSource = new BehaviorSubject(new Array<TaskModel>());
  currentTodolist = this.todolistSource.asObservable();

  public idsTodolist: Array<number> = [];

  constructor(private http: HttpClient) { }

  /*****************************************************************\
   *                          task api
   *****************************************************************/
  getAllTasks(): Observable<any> {
    return  this.http.get(this.URL_BASE + this.TODOLIST_API + 'all')
      .pipe( map(value => {
        return value;
    }));
  }

  public findTaskById(ids: Array<number>): Observable<any> {
    return  this.http.get( `${this.URL_BASE}${this.TODOLIST_API}task?ids=${this.arrayIdToString(ids)}`)
      .pipe( map(value => {
        return value;
      }));
  }

  public setTodolist(newTodolist: Array<TaskModel>): void{
    this.todolistSource.next(newTodolist)
  }

  public createTask(task: TaskModel): void {
    this.http.post(this.URL_BASE + this.TODOLIST_API + 'new', task)
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
    this.http.put(`${this.URL_BASE}${this.TODOLIST_API}edit/${taskId}`, taskToUpdate)
      .subscribe( (response: any) => {
        this.setTodolist(this.addTaskInTodolistArray(this.buildTaskModel(response), newTodolist));
        console.log('put_res: ', response);
      });
  }

  public deleteTask(taskId: number): void {
    this.http.delete(`${this.URL_BASE}${this.TODOLIST_API}delete/${taskId}`)
      .subscribe( response => {
        const newTodolist = this.todolistSource.value.filter( task => task.id != response)
        this.setTodolist(newTodolist);
        console.log('delete_res: ', response)
      });
  }

  /*****************************************************************\
   *                          board api
   *****************************************************************/
  public getBoardByUserId(userId: string): Observable<any> {
    return this.http.get(this.URL_BASE + this.BOARD_API + userId)
      .pipe( map( response => {
        return response}));
  }

  public createUserBoard(bodyParam: BoardModel): Observable<any> {
    return this.http.post( this.URL_BASE + this.BOARD_API + 'new', bodyParam)
      .pipe( map( response => {
        console.log('resp: ', response);
        return response
      }));
  }
  /*****************************************************************\
   *                        object builder
   *****************************************************************/
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
      createdOn: response.createdOn,
      updatedOn: response.updatedOn,
      userId: response.userId,
      boardId: response.board
    }
  }

  public arrayIdToString(arrayToFormat: Array<number>): string {
    return arrayToFormat? arrayToFormat.join() : '';
  }
}
