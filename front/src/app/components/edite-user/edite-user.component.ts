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
  public user: UserModel = new UserModel();

  constructor(private sotreService: StoreService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  public onChangeUserAvatar(event: Event): void {
    const files: FileList | null = (event.target as HTMLInputElement).files

    if (files && files.length) {
      this.uploadedAvatar = files.item(0);
    }
    console.log('file: ', this.uploadedAvatar)
  }

  public updateAvatar(): void {
   this.sotreService.addUserAvatar(this.uploadedAvatar as File)
      .subscribe( data => {
        console.log('data: ')
      },
          error => {console.log('error: ', error)})
  }

  public getCurrentUser(): void {
    this.sotreService.currentUser.subscribe( user => this.user =  user);
  }

  getFile(){
    console.log('file: ', this.uploadedAvatar);
  }
}
