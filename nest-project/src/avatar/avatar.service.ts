import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { AvatarModel } from '../model/user/avatar.model';
import { directus } from '../main';
import { FileModel } from '../model/user/file.model';
import { MetadataModel } from '../model/user/file/metadata.model';

@Injectable()
export class AvatarService {

    public async uploadAvatar(file: Express.Multer.File, userId: string): Promise<AvatarModel> {
        let avatar: AvatarModel = new AvatarModel();
        await directus.files.create(this.transformToFileModel(file, userId))
            .then( response => {
                if(response.data.id.length) {
                    avatar = this.transformToAvatarModel(response.data);
                }
            })
            .catch( error => { avatar.errors.push(error) });
        return avatar;
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


    public transformToAvatarModel(directusFile: FileModel): AvatarModel{
        let avatar: AvatarModel = new AvatarModel();
        avatar.id = directusFile.id
        avatar.mimetype = directusFile.type;
        avatar.originalname = directusFile.filename_download;
        avatar.filename = directusFile.filename_disk;
        return avatar;
    }

    public transformToFileModel(file: Express.Multer.File, userId: string): FileModel {
        let retour: FileModel = new FileModel();
        retour.setBasicInformation(file.filename, file.originalname, file.mimetype, file.size, userId)
        return retour;
    }
    public emptyMetada(): MetadataModel{
        return new MetadataModel();
    }
}
