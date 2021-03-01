import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { LoginsModel } from '../../model/logins.model';
import { UtilsTool } from '../../utils/utils-tool';
import { UserModel } from '../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public readonly FORM_CONTROL = 'form-control';
  public readonly UTILS: UtilsTool = new UtilsTool();

  public signInEmail: string = '';
  public signInPassword: string = '';

  public emailCssClass: string = this.FORM_CONTROL;
  public pwdCssClass: string = this.FORM_CONTROL;

  constructor(private storeService: StoreService, private router: Router) { }

  ngOnInit(): void {
  }

  public createLogins(): LoginsModel {
    return {
      email: this.signInEmail,
      password: this.signInPassword
    }
  }

  public onSignIn(): void{
    let logins: LoginsModel = this.createLogins();
    if(this.isSigninFormValid()) {
      this.storeService.signIn(logins).subscribe( (user: UserModel) => {
        this.storeService.setUser(user);
        this.storeService.setSession(user);
        this.router.navigate(['board']).then(r => console.log('navigate to board: ', r));
      })
    } else {

    }
  }

  public onEmailChange(email: string, ): void {
    this.emailCssClass = this.UTILS.setCssClass(this.UTILS.isValidEmail(email));
  }

  public onPasswordChange(password: string): void {
    this.pwdCssClass = this.UTILS.setCssClass(this.UTILS.isValidPassword(password));
  }

  public checkAllInputs(email: string, password: string): void {
    this.onEmailChange(email);
    this.onPasswordChange(password);
  }

  public isSigninFormValid(): boolean {
    this.checkAllInputs(this.signInEmail, this.signInPassword);
    return this.UTILS.isValidEmail(this.signInEmail) && this.UTILS.isValidPassword(this.signInPassword);
  }
}
