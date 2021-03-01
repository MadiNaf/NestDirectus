import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public session: boolean = false;
  public signUp: boolean = false;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.getSession();
    this.isSignUp();
  }

  public isSignUp(): void {
    this.storeService.currentSignUpState.subscribe(value => this.signUp = value);
    console.log('signupResp: ', this.signUp)
  }

  public getSession(): void {
    this.storeService.currentSession.subscribe(session => this.session = session);
    console.log('sessionResp: ', this.session);
  }
}
