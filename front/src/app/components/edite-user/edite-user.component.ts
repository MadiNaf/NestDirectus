import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service';
import {UserModel} from '../../model/user.model';

@Component({
  selector: 'app-edite-user',
  templateUrl: './edite-user.component.html',
  styleUrls: ['./edite-user.component.css']
})
export class EditeUserComponent implements OnInit {

  public uploadedAvatar: File | null = null;
  public currentUser: UserModel = new UserModel();

  constructor(private sotreService: StoreService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  /****************************************************\
   *                event handler                     *
  \****************************************************/
  public onChangeUserAvatar(event: Event): void {
    const files: FileList | null = (event.target as HTMLInputElement).files

    if (files && files.length) {
      this.uploadedAvatar = files.item(0);
    }
    console.log('file: ', this.uploadedAvatar)
  }

  public onChangeFirstname(firstname: string): void {}

  public onChangeLastName(lastname: string): void{}

  public onChangeEmail(email: string): void {}

  public onChangeTitle(title: string): void {}

  public onChangeDescription(description: string): void {}

  getFile(){
    console.log('file: ', this.uploadedAvatar);
  }

  /****************************************************\
   *                service call                      *
  \****************************************************/

  public uploadAvatar(): void {
    this.sotreService.uploadAvatar(this.uploadedAvatar as File, this.currentUser.id)
      .subscribe( data => {
          console.log('data: ')
        },
        error => {console.log('error: ', error)})
  }

  public updateUserAvatar(): void {}

  public getCurrentUser(): void {
    this.sotreService.currentUser.subscribe( user => this.currentUser =  user);
  }
}
