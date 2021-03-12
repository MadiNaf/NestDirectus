import {Controller, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {Express} from 'express';
import {FileInterceptor} from "@nestjs/platform-express";
import {AvatarModel} from "../model/user/avatar.model";
import {AvatarService} from "./avatar.service";
import {diskStorage} from "multer";

@Controller('avatar')
export class AvatarController {

    constructor(private avatarService: AvatarService) {
    }

    @Post('upload/:id')
    @UseInterceptors(
        FileInterceptor('file', {

            // local storage options
            storage: diskStorage({
                destination: '../directus-project/uploads/',
                filename: function (req, file, cb) {

                    function generateRandomName(originalname: string): string {
                        // split the original file name
                        const tab = originalname.split('.');
                        // get the file extension
                        const ext = tab[tab.length - 1];
                        // Date.now() returns the number of milliseconds since January 1, 1970
                        const date = Date.now();
                        // generate two random string
                        const randomString = Math.random().toString(36).substring(2, 15) +
                            Math.random().toString(36).substring(2, 15);
                        return `${date}_${randomString}.${ext.toLowerCase()}`
                    }
                    console.log(file);
                    cb(null, generateRandomName(file.originalname))
                }
            }),

            // file filter options
            fileFilter (req, file, cb) {
                // handle upload file extension
                function isAcceptedFile(originalname: string): boolean{
                    const ACCEPTED_EXTENSIONS: Array<string> = ['jpg', 'jpeg', 'png']
                    const stringToArray = originalname.split('.');
                    const extension = stringToArray[stringToArray.length - 1];
                    return ACCEPTED_EXTENSIONS.includes(extension.toLowerCase());
                }

                cb(null, isAcceptedFile(file.originalname))
                //cb(new Error('Something goes wrong'), false)
            }
    },))
    uploadAvatar(@UploadedFile() file: Express.Multer.File, @Param('id') id: string): Promise<AvatarModel> {
        return this.avatarService.uploadAvatar(file, id);
    }

    @Get(':id')
    getUserAvatar(@Param('id') id: string): Promise<any> {
        return this.avatarService.getUserAvatarById(id);
    }
}
