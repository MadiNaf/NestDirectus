import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { UserModel } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from '../model/task.model';
import { LoginsModel } from '../model/logins.model';
import { map } from "rxjs/operators";
import { UtilsTool } from "../utils/utils-tool";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public readonly UTILS: UtilsTool = new UtilsTool();
  public userBoardId: number = 0;

  public userSource = new BehaviorSubject(new UserModel());
  currentUser = this.userSource.asObservable();

  public sessionSource = new BehaviorSubject(false);
  currentSession = this.sessionSource.asObservable();

  public signUpState = new BehaviorSubject(false);
  currentSignUpState = this.signUpState.asObservable();

  constructor(private http: HttpClient) { }

  private baseUrlApi: string = 'http://localhost:3000/';
/*****************************************************************\
 *                          user api
 *****************************************************************/
  public signUp(user: UserModel): Observable<any> {
    return this.http.post(this.baseUrlApi + 'user/signup', user)
      .pipe( map( response => {
        return response
      }));
  }

  public signIn(logins: LoginsModel): Observable<any> {
    return this.http.post(this.baseUrlApi + 'user/signin', logins)
      .pipe( map( (response: any) => {
        return this.UTILS.buildUser(response);
      }));
  }

  public logOut(logins: LoginsModel): void {
    this.http.post(this.baseUrlApi + '', logins)
      .subscribe((response: any) => {
        console.log('post_res: ', response);
      });
  }

  public addUserAvatar(userAvatar: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', userAvatar, userAvatar.name );
    return this.http.post(this.baseUrlApi + 'upload', formData)
      .pipe( map( response => {
        return response;
      }))
  }

  public getUserAvatarById(avatarId: string): void{}

/*****************************************************************\
 *                  getter and setter
 *****************************************************************/
  public setSession(user: UserModel): void {
  this.sessionSource.next(this.UTILS.isValidEmail(user.email) && this.UTILS.isValidUserId(user.id));
  }

  public setSignUpState(isSignUp: boolean): void{
    this.signUpState.next(isSignUp);
  }

  public setUser(user: UserModel) {
    this.userSource.next(user)
  }

  public getUserBoardId(): number {
    return this.userBoardId;
  }

  public setUserBoardId(id: number): void {
    this.userBoardId = id;
  }
}
