export class AvatarModel {
    id: string;
    storage?: string = 'local';
    title: string;
    type: string;
    filesize: number;

    destination?: string;
    path?: string; // /directus-project/uploads/filename_disk
    folder?: string;
    width?: number;
    height?: number;
    filename_disk?: string
    filename_download?: string // title.lowercase without extention
    uploaded_by: string;
    uploaded_on?: string;
    /*





     */
}