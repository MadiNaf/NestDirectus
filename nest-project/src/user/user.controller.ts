import { Body, Controller, Post} from '@nestjs/common';
import { UserModel } from '../model/user/user.model';
import { UserService } from './user.service';
import { LoginModel } from '../model/user/login.model';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('signup')
    signUp(@Body() user: UserModel): Promise<UserModel> {
        return this.userService.signUp(user)
    }

    @Post('signin')
    signIn(@Body()userLogin: LoginModel): Promise<string>{
        return this.userService.signIn(userLogin)
    }

    @Post('logout')
    logOut(@Body()user: UserModel): void{
        this.userService.logOut(user)
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
