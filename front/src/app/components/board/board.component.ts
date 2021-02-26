import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { UserModel } from '../../model/user.model';
import { TodolistService } from '../../services/todolist.service';
import {BoradModel} from '../../model/borad.model';
import {TaskModel} from '../../model/task.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public user: UserModel = new UserModel();
  public board: BoradModel = new BoradModel();
  public userTodolist: Array<TaskModel> = new Array<TaskModel>();

  constructor(private storeService: StoreService, private todolistService: TodolistService) { }

  ngOnInit(): void {
    this.storeService.currentUser.subscribe( response => this.user = response)
    this.todolistService.getBardByUserId(this.user.id).subscribe(value => {
      value.forEach((board: BoradModel) => this.board = board);
      this.getUserTodolist(this.board.id_todolist);
    })
  }

  public getUserTodolist(idsTodolist: Array<number>): void {
    this.todolistService.findTaskById(idsTodolist).subscribe(value => {
      value.forEach((todolist: TaskModel ) => this.userTodolist.push(todolist));

      console.log('todolist: ', value)
    });
    this.todolistService.setTodolist(this.userTodolist);
  }
}
