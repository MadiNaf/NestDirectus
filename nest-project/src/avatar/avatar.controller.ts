import {Controller, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {Express} from 'express';
import {FileInterceptor} from "@nestjs/platform-express";
import {AvatarModel} from "../model/user/avatar.model";
import {AvatarService} from "./avatar.service";

@Controller('avatar')
export class AvatarController {

    constructor(private avatarService: AvatarService) {
    }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    uploadAvatar(@UploadedFile() file: Express.Multer.File, @Param('id') id: string): AvatarModel {
        return this.avatarService.uploadAvatar(file, id);
    }

    @Get(':id')
    getUserAvatar(@Param('id') id: string): Promise<any> {
        return this.avatarService.getUserAvatarById(id);
    }

}
