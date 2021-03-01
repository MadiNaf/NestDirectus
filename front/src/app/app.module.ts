import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {TodolistService} from "./services/todolist.service";
import { TodolistComponent } from './components/todolist/todolist.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import {FormsModule} from "@angular/forms";
import { BoardComponent } from './components/board/board.component';
import { AuthComponent } from './components/auth/auth.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    TaskCardComponent,
    BoardComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [TodolistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
