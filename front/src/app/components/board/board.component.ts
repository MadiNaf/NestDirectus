import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { UserModel } from '../../model/user.model';
import { TodolistService } from '../../services/todolist.service';
import { BoardModel } from '../../model/board.model';
import { TaskModel } from '../../model/task.model';
import { Router } from '@angular/router';
import { UtilsTool } from '../../utils/utils-tool';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public readonly UTILS: UtilsTool = new UtilsTool();
  public readonly DEFAULT_CLASS: string = 'form-control';

  public user: UserModel = new UserModel();
  public board: BoardModel = new BoardModel();
  public userTodolist: Array<TaskModel> = new Array<TaskModel>();
  public hasBoard: boolean = false;

  public boardTitle: string = '';
  public boardDescription: string = '';
  public titleCssClass: string = this.DEFAULT_CLASS;
  public descriptionCssClass: string = this.DEFAULT_CLASS;

  constructor(
    private storeService: StoreService,
    private todolistService: TodolistService,
    private router: Router) { }

  ngOnInit(): void {
    this.hasSession();
    this.storeService.currentUser.subscribe( response => this.user = response)
    this.todolistService.getBoardByUserId(this.user.id).subscribe(value => {
      if (value.length){
        this.hasBoard = true;
        value.forEach((board: BoardModel) => this.board = board);
        this.getUserTodolist(this.board.id_todolist);
        this.storeService.setUserBoardId(this.board.id)
      } else {
        this.hasBoard = false;
      }

    })
  }

  public getUserTodolist(idsTodolist: Array<number>): void {
    this.todolistService.findTaskById(idsTodolist).subscribe(value => {
      value.forEach((todolist: TaskModel ) => this.userTodolist.push(todolist));
    });
    this.todolistService.setTodolist(this.userTodolist);
  }

  public hasSession(): void {
    this.storeService.currentSession.subscribe( session => {
      if(!session){
        this.router.navigate(['home']).then(r => console.log('navigation done: ', r))
      }
    });
  }

  public buildBoard(title: string, description: string): BoardModel {
    return {
      id:0,
      title:  title,
      description:  description,
      id_user:  this.user.id,
      id_todolist:  []
    }
  }
  /*****************************************************************\
   *                        events handler
   *****************************************************************/
  public onCreateBoard() {
    if(this.hasTitleAndDescription(this.boardTitle, this.boardDescription)){
      console.log('title: ', this.boardTitle, this.boardDescription);
      console.log('description: ', this.boardDescription)
      this.createBoard();
      this.hasBoard = true;
    }
  }

  public onTitleChange(title: string): void {
    this.titleCssClass = this.UTILS.setCssClass(this.isValidTitle(title));
  }

  public onDescriptionChange(description: string): void {
    this.descriptionCssClass = this.UTILS.setCssClass(this.isValidDescription(description));
  }

  public isValidTitle(title: string): boolean {
    return this.UTILS.isNotEmptyString(title);
  }

  public isValidDescription(description: string): boolean {
    return this.UTILS.isNotEmptyString(description);
  }

  public hasTitleAndDescription(title: string, description: string): boolean {
    return this.isValidTitle(title) && this.isValidDescription(description);
  }

  public createBoard(): void {
    const board = this.buildBoard(this.boardTitle, this.boardDescription);
    this.todolistService.createUserBoard(this.buildBoard(this.boardTitle, this.boardDescription))
      .subscribe( board => {
        this.board = board;
        this.getUserTodolist(this.board.id_todolist);
        this.storeService.setUserBoardId(this.board.id)
     });
  }
}
