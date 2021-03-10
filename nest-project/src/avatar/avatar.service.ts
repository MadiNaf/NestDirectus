import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { AvatarModel } from '../model/user/avatar.model';
import { directus } from '../main';
import { FileModel } from '../model/user/file.model';
import { MetadataModel } from '../model/user/file/metadata.model';
import { UserModel } from '../model/user/user.model';

const FormData = require('form-data');

@Injectable()
export class AvatarService {

    public async uploadAvatar(file: Express.Multer.File, userId: string): Promise<any> {
        let user: UserModel = new UserModel();
        let rt : any;
        await directus.files.create(this.transformToFileModel(file, userId))
            .then( response => {
                // avatar = this.transformToAvatarModel(response);
                console.log(response);
                if(response.data.id.length) {
                    console.log(response);
                    rt = response.data;

                    // update user avatar
                    const payload = {avatar: response.data.id}
                    directus.users.update(payload)
                        .then( res => { user = res.data})
                        .catch(error => { console.log('SET_USER_AVATAR_ER: ', error)})
                }
            })
            .catch( error => { rt = error });
        return user;
    }

    public getUserAvatarById(imageId: string): Promise<any>{
        const query = { filter: { id: {_eq: imageId} }};
        return directus.files.read(query)
           .then( response => {
               console.log('response: ', response);
               return response;
           })
           .catch(error => console.log('get user avatar error: ', error));
    }


/*    transformToAvatarModel(diretusFile: FileModel): AvatarModel{
        let avatar: AvatarModel = new AvatarModel();
        avatar.mimetype = diretusFile.type;
        avatar.originalname = diretusFile.filename_download;
        avatar.filename = diretusFile.filename_disk;
        return avatar;
    }*/

    public transformToFileModel(file: Express.Multer.File, userId: string): FileModel {
        let retour: FileModel = new FileModel();
        retour.setBasicInformation(file.filename, file.originalname, file.mimetype, file.size, userId)
        return retour;
    }
    public emptyMetada(): MetadataModel{
        return new MetadataModel();
    }

}
