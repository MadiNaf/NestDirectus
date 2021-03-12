import {MetadataModel} from './file/metadata.model';
import {Readable} from 'stream';

export class FileModel {
    public readonly id?: string = '';
    public readonly storage?: string = 'local';

    public filename_disk: string;
    public filename_download: string;
    public title: string;
    public type: string;
    public folder: string;
    public width: number;
    public height: number;
    public description: string;
    public location: string;
    public duration: string;
    public tags?: string;
    public filesize: number;

    public uploaded_by: string;
    public uploaded_on?: string;
    public modified_by?: string;
    public modified_on?: string;

    public metadata: MetadataModel

    public setBasicInformation(
        filename: string, originalName: string, mimetype: string, size: number, userId: string): void {
        this.filename_disk = filename;
        this.filename_download = originalName;
        this.type = mimetype;
        this.filesize = size;
        this.uploaded_by = userId;
        this.title = originalName
    }
}

