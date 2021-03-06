import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { BoardComponent } from './components/board/board.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import {EditeUserComponent} from "./components/edite-user/edite-user.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'board', component: BoardComponent },
  { path: 'todolist', component: TodolistComponent},
  { path: 'edit/profile', component: EditeUserComponent, pathMatch: 'full'},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
