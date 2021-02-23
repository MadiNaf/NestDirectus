import {LoginModel} from "./login.model";

export class UserModel extends LoginModel{
    id: string;
    first_name: string;
    last_name: string;
    role: string = '';
    token: string;
    avatar: string;
    description: string;
    language: string;
    location: null;
    title: string;
}
