export class DirectusFileModel {
    public readonly id?: string = '';
    public readonly storage?: string = 'local';

    public filename_disk: string = '';
    public filename_download: string = '';
    public title: string = '';
    public type: string = '';
    public folder: string = '';
    public width: number = 0;
    public height: number = 0;
    public description: string  = '';
    public location: string  = '';
    public duration: string  = '';
    public tags: string = '';
    public filesize: number = 0;

    public uploaded_by: string = '';
    public uploaded_on?: string = '';
    public modified_by?: string = '';
    public modified_on?: string = '';

    public metadata: MetadataModel = new MetadataModel();

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

class MetadataModel {
    public icc: IccModel = new IccModel();
}

class IccModel {
    version: string = '';
    intent: string = '';
    cmm: string = '';
    deviceClass: string = '';
    colorSpace: string = '';
    connectionSpace: string = '';
    platform: string = '';
    creator: string = '';
    description: string = '';
    copyright: string = '';
}
