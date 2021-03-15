import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../model/user.model';
import {StoreService} from "../../../services/store.service";

@Component({
  selector: 'app-rendering',
  templateUrl: './rendering.component.html',
  styleUrls: ['./rendering.component.css']
})
export class RenderingComponent implements OnInit {

  @Input()
  public currentUser: UserModel = new UserModel();

  public readonly DEFAULT_AVATAR: string = '../../../../assets/img/default-avatar.png';
  public currentUserAvatar: string = ''

  constructor( private storeService: StoreService) { }

  ngOnInit(): void {
    this.currentUserAvatar = this.getUserAvatar();
  }

  public getUserAvatar(): string {
    return this.currentUser.avatar ? this.storeService.getUserAvatar() : this.DEFAULT_AVATAR;
  }
}
