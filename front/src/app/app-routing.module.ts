import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "./components/auth/auth.component";
import { BoardComponent } from "./components/board/board.component";
import { TodolistComponent } from "./components/todolist/todolist.component";

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'board', component: BoardComponent },
  { path: 'todolist', component: TodolistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
