import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { UserModel } from '../../model/user.model';
import { UtilsTool} from '../../utils/utils-tool';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public readonly FORM_CONTROL = 'form-control';
  public readonly UTILS: UtilsTool = new UtilsTool();

  public isSignup: boolean = false;
  public isSignupSuccess: boolean = false;
  public isSignupFail: boolean = false;

  public firstName: string = '';
  public lastName: string = '';
  public signUpEmail: string = '';
  public signUpPassword: string = '';
  public passwordConfirmation: string = '';

  public firstNameCssClass: string = this.FORM_CONTROL;
  public lastNameCssClass: string = this.FORM_CONTROL;
  public emailCssClass: string = this.FORM_CONTROL;
  public pwdCssClass: string = this.FORM_CONTROL;
  public pwdConfirmationCssClass: string = this.FORM_CONTROL;


  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.currentSession.subscribe(value => this.isSignup = value);
    console.log('sign up: ', this.isSignup)
  }

  public onSignUp() {
    if(this.isSignupFormValid()) {
      let user: UserModel = this.UTILS
        .createUser(this.firstName, this.lastName, this.signUpEmail, this.signUpPassword);

      console.log('new user: ', user);

      this.storeService.signUp(user).subscribe( value => {
        console.log('signup_onSignUp: ', value)
        if(this.UTILS.isValidEmail(value.email)) {
          this.storeService.setSignUpState(true);
        }
      });
      this.storeService.setSignUpState(true);
      this.isSignupSuccess = true;
      this.isSignupFail = !this.isSignupSuccess;
    } else {
      this.isSignupSuccess = false;
      this.isSignupFail = !this.isSignupSuccess;
    }
  }

  public onFirstNameChange(firstname: string): void {
    this.firstNameCssClass = this.UTILS.setCssClass(this.UTILS.isNotEmptyString(firstname));
  }

  public onLastNameChange(lastname: string): void {
    this.lastNameCssClass = this.UTILS.setCssClass(this.UTILS.isNotEmptyString(lastname));
  }

  public onEmailChange(email: string): void {
    this.emailCssClass = this.UTILS.setCssClass(this.UTILS.isValidEmail(email));
  }

  public onPasswordChange(password: string): void {
    this.pwdCssClass = this.UTILS.setCssClass(this.UTILS.isValidPassword(password));
  }
  public onPasswordConfirmation(passwordConfirmation: string): void{
    this.pwdConfirmationCssClass = this.UTILS.setCssClass(this.UTILS.isTheSameString(this.signUpPassword, passwordConfirmation));
  }

  public checkAllInputs(firstname: string, lastname: string, email: string, password: string, passwordConfirmation: string): void {
    this.onFirstNameChange(firstname);
    this.onLastNameChange(lastname);
    this.onEmailChange(email);
    this.onPasswordChange(password);
    this.onPasswordConfirmation(passwordConfirmation);
  }

  public isSignupFormValid(): boolean{
    this.checkAllInputs(this.firstName, this.lastName, this.signUpEmail, this.signUpPassword, this.passwordConfirmation);
    return this.UTILS.isNotEmptyString(this.firstName) && this.UTILS.isNotEmptyString(this.lastName) &&
      this.UTILS.isValidEmail(this.signUpEmail) && this.UTILS.isValidPassword(this.signUpPassword) &&
      this.UTILS.isTheSameString(this.signUpPassword, this.passwordConfirmation);
  }
}
