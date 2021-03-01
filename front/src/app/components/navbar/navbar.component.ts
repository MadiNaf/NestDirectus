import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
  }

  public isSignUp(): boolean {
    let state: boolean = false
    console.log('state: ', state);
    this.storeService.currentSignUpState.subscribe(value => state = value);
    return state;
  }
}
