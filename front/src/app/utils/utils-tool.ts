import {UserModel} from "../model/user.model";

export class UtilsTool {

  public constructor() {}

  /*****************************************************************\
   *                       validator
   *****************************************************************/
  public isNotEmptyString(str: string): boolean{
    console.log('firstName: ', str);
    return str != '';
  }

  public isValidEmail(email: string): boolean {
    const pattern: RegExp = new RegExp('^[\\w-\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    return  pattern.test(email);
  }

  public isValidPassword(password: string): boolean{
    return this.isNotEmptyString(password) && (password.length > 4);
  }

  public isTheSameString(expectedString: string, stringToTest: string): boolean{

    return this.isNotEmptyString(stringToTest) && (expectedString === stringToTest);
  }

  public setCssClass(isValid: boolean): string {
    return isValid? 'form-control is-valid' : 'form-control is-invalid';
  }

  public isValidUserId(userId: string): boolean {
    const pattern: RegExp = new RegExp('([\\da-zA-Z_-]+)');
    return pattern.test(userId);
  }
  /*****************************************************************\
   *                       object builder
   *****************************************************************/
  public createUser(firstName: string, lastName: string, email: string, pwd: string): UserModel {
    let user = new UserModel();
    user.first_name = firstName
    user.last_name = lastName
    user.email = email
    user.password = pwd
    return user;
  }

  public buildUser(response: UserModel): UserModel {
    return {
      id: response.id,
      first_name: response.first_name,
      last_name: response.last_name,
      email: response.email,
      password: '',
      role: '',
      token: response.token,
      avatar: response.avatar,
      description: response.description,
      language: response.language,
      location: response.location,
      title: response.title
    }
  }

}






