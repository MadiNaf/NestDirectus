export class AvatarModel {
    /*The key name*/
    public id: string;
    public fieldname: string;
    public originalname: string;
    public encoding: string;
    public mimetype: string;
    public readonly destination?: string = "../directus-project/uploads/";
    /* File name in the destination */
    public filename: string;
    public path: string;
    public size: number;
    public errors?: Array<any> = [];
}