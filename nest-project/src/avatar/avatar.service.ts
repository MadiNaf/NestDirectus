import { Injectable } from '@nestjs/common';
import {Express, response} from 'express';
import {AvatarModel} from '../model/user/avatar.model';
import { directus } from '../main';

@Injectable()
export class AvatarService {
    public uploadAvatar(file: Express.Multer.File, userId: string): AvatarModel {
        const payload = '';
        directus.files.create().then().catch()
        return this.getAvatarFileInformation(file, userId);
    }

    public getUserAvatarById(imageId: string): Promise<any>{
        console.log('ID_IMAGE: ', imageId)
        const query = { filter: { id: {_eq: imageId} }};
       return directus.files.read(query)
           .then( response => {
               console.log('response: ', response);
               return response;
           })
           .catch(error => console.log('get user avatar error: ', error));
    }

    getAvatarFileInformation(file: Express.Multer.File, userId: string){
        return {
            id: '',
            title: file.originalname,
            type: file.mimetype,
            filesize: file.size,
            path: file.path,
            uploaded_by: userId
        }
    }
}
