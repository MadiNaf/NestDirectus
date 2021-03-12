import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../model/user.model';

@Component({
  selector: 'app-rendering',
  templateUrl: './rendering.component.html',
  styleUrls: ['./rendering.component.css']
})
export class RenderingComponent implements OnInit {

  @Input()
  public currentUser: UserModel = new UserModel();

  public readonly DEFAULT_AVATAR: string = '../../../../assets/img/default-avatar.png';
  constructor() { }

  ngOnInit(): void {}

  public getUserAvatar(): string {
    return this.currentUser.avatar ? this.currentUser.avatar : this.DEFAULT_AVATAR;
  }
}
