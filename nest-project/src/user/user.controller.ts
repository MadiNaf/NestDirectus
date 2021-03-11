import {Body, Controller, Param, Post, Put} from '@nestjs/common';
import { UserModel } from '../model/user/user.model';
import { UserService } from './user.service';
import { LoginModel } from '../model/user/login.model';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('signup')
    signUp(@Body() user: UserModel): Promise<LoginModel> {
        return this.userService.signUp(user)
    }

    @Post('signin')
    signIn(@Body()userLogin: LoginModel): Promise<UserModel>{
        return this.userService.signIn(userLogin)
    }

    @Post('logout')
    logOut(@Body()user: UserModel): void{
        this.userService.logOut(user)
    }

    @Put('edit/:id')
    updateUser(@Param('id') id: string, @Body() userToUpdate: UserModel): Promise<UserModel>{
        return this.userService.editUser(userToUpdate, id);
    }

    @Put('edit/avatar/:id')
    updateUserAvatar(@Param('id') id: string, @Body() user: UserModel): Promise<UserModel>{
        return this.userService.editUserAvatar(user, id);
    }

    @Post('password/request')
    resetPasswordRequest(@Body() userLogin: LoginModel): void{
        this.userService.requestPasswordReset(userLogin)
    }
    @Post('password/reset')
    resetPassword(@Body() user: UserModel): void {
        this.userService.resetUserPassword(user)
    }
}
