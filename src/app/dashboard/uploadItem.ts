import { UploadItem }    from 'angular2-http-file-upload';
 
export class MyUploadItem extends UploadItem {
    id: number;
    constructor(file: any,itemId,userId) {
        super();
        this.url = 'http://localhost:3000/api/users/'+userId;//add post api url
        this.file = file;
        this.id = itemId;
    }
}