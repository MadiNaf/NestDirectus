import {UserModel} from "./user.model";

export class FullUserModel extends UserModel{
    status: string;
    tags: string;
    tfa_secret: null;
    last_access: null;
    last_page: string;
    theme = 'auto';
}
