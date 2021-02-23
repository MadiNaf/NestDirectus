import { Injectable } from '@nestjs/common';
import { directus } from "../main";
import { UserModel } from "../model/user/user.model";
import { FullUserModel } from "../model/user/full-user.model";
import { LoginModel } from "../model/user/login.model";

@Injectable()
export class UserService {
    public async signUp(user: UserModel): Promise<UserModel> {
        let retour: UserModel = new UserModel();

        if(this.isValidUser(user)) {
            user.role = '9f2ea142-b027-4d19-9a8e-5fc82175cc37'
            await directus.users.create(user)
                .then(response => {
                    console.log('response: ', response);
                    retour = this.buildUser(response.data)
                })
                .catch(error => console.log('sign up err: ', error))
        }
        return retour;
    }

    public async signIn(loginModel: LoginModel): Promise<string> {
        if(this.isValidUser(loginModel)) {
            return await directus.auth.login({email: loginModel.email, password: loginModel.password})
                .then( async (response) => {
                    console.log('response: ', response.data.expires)
                    directus.auth.token = response.data.access_token;

                    return response.data.access_token;
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
            role: data.role,
            token: data.token,
            avatar: data.avatar,
            description: data.description,
            language: data.language,
            location: data.location,
            title: data.title,
        }
    }

    async getUserByEmail(email: string, token: string) {
        const query = { filter: { email: {_eq: email} }};
        const payload = { token: token };
        console.log('pld: ', payload)
        await directus.users.read(query)
            .then( async (response) => {
                await this.updateUserToken(response.data[0].id, payload)
                console.log('id: ', response.data[0].id)
            })
            .catch(error => console.log('error get user'))
    }

    async updateUserToken(idUser: string, payload: any) {
        await directus.users.update(idUser, payload)
            .then(response => console.log('token updated: ', response))
            .catch(error => console.log('ERROR_USER_TOKEN: ', error))
    }
}
