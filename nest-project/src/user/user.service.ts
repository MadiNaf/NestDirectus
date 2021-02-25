import { Injectable } from '@nestjs/common';
import { directus } from "../main";
import { UserModel } from "../model/user/user.model";
import { FullUserModel } from "../model/user/full-user.model";
import { LoginModel } from "../model/user/login.model";

@Injectable()
export class UserService {

    public async signUp(user: UserModel): Promise<LoginModel> {
        let retour: LoginModel = new LoginModel();
        if(this.isValidUser(user)) {
            await this.directusAuth();
            user.role = '9f2ea142-b027-4d19-9a8e-5fc82175cc37'
            await directus.users.create(user)
                .then(response => {
                    retour = { email: response.data.email, password: '***'}
                })
                .catch(error => console.log('sign up err: ', error))
        }
        return retour;
    }

    public async signIn(loginModel: LoginModel): Promise<UserModel> {
        let user: UserModel = new UserModel();

        if(this.isValidUser(loginModel)) {
            return await directus.auth.login({email: loginModel.email, password: loginModel.password})
                .then( async (response) => {
                    console.log('response: ', response.data.expires)
                    directus.auth.token = response.data.access_token;

                    await this.getUserByEmail(loginModel.email)
                        .then((response: any) => {
                            if(response.data[0]) {
                               user = this.buildUser(response.data[0]);
                            }
                            return user;
                        })
                        .catch(error => console.log('get user err: ', error))
                    return user;

                })
                .catch(error => console.log('sign in err: ', error))
        }
    }

    public logOut(user: UserModel): void {
        if(this.isValidUser(user)) {
            directus.auth.logout()
                .then(response => console.log('response: ', response))
                .catch(error => console.log('log out err: ', error))
        }
    }

    public editUser(user: UserModel): void {
        if(this.isValidUser(user)) {
            directus.users.update({email: user.email, password: user.password})
                .then(response => console.log('response: ', response))
                .catch(error => console.log('edit user err: ', error))
        }
    }

    public requestPasswordReset(userLogin: LoginModel): void {
        directus.auth.password.request(userLogin.email)
            .then(response => console.log('response: ', response))
            .catch(error => console.log('request pwd reset err: ', error))
    }

    public resetUserPassword(user: UserModel): void {
        directus.auth.password.reset(user.token, user.password)
            .then(response => console.log('response: ', response))
            .catch(error => console.log('reset pwd err: ', error))
    }

    public isValidUser(loginModel: LoginModel): boolean{
        console.log('is valid: ', loginModel)
        return !!(loginModel.email && loginModel.password);
    }

    buildUser(data: FullUserModel): UserModel{
        return {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            role: '',
            token: data.token,
            avatar: data.avatar,
            description: data.description,
            language: data.language,
            location: data.location,
            title: data.title,
        }
    }

    async directusAuth(): Promise<any> {
        await directus.auth.login({email: 'madi@dev.fr', password: 'M@d!976'})
            .then( response => {
                console.log('auth: ', response.data)
            }
        )
    }

    async getUserByEmail(email: string): Promise<Object>{
        const query = { filter: { email: {_eq: email} }};
        return await directus.users.read(query)
    }

    /**
    async updateUserToken(idUser: string, payload: any) {
        await directus.users.update(idUser, payload)
            .then(response => console.log('token updated: ', response))
            .catch(error => console.log('ERROR_USER_TOKEN: ', error))
    }
     */
}
