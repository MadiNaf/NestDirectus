import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import {UserModel} from "../../model/user.model";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public user: UserModel = new UserModel();

  constructor(private storeService: StoreService ) { }

  ngOnInit(): void {
    this.storeService.currentUser.subscribe( response => this.user = response)
  }

}
