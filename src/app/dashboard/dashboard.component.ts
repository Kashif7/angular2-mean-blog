import { Component, OnInit } from '@angular/core';
//services
import { Uploader } from 'angular2-http-file-upload';
import { AuthService } from '../auth.service';
//data types
import { MyUploadItem } from './uploadItem';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  post: any = {};
  userId: number;
  uploadingItems: any[] = [];
  constructor(public uploaderService: Uploader, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.currentUser().id;
  }


  onSubmit() {
    var timestamp = new Date().getUTCMilliseconds();
    //uploaded file
    let uploadFile = (<HTMLInputElement>window.document.getElementById('myFileInputField')).files[0];
    //creating the upload file object
    let myUploadItem = new MyUploadItem(uploadFile, timestamp, this.userId);
    //adding the rest of parameters
    myUploadItem.formData = this.post;
    //queying the uploaded items
    this.uploadingItems.push(myUploadItem);

    this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
      console.log("Upload Successful");
    };
    this.uploaderService.onErrorUpload = (item, response, status, headers) => {
      console.log("error occured");
    };
    this.uploaderService.onProgressUpload = (item, percentComplete) => {
      for (let i = 0; i < this.uploadingItems.length; i++) {
        if (this.uploadingItems[i] === item) {
          console.log("the id is " + this.uploadingItems[i].id);
          this.progressBar(this.uploadingItems[i].id, item.file.name, percentComplete);
        }
      }
    };
    this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
      for (let i = 0; i < this.uploadingItems.length; i++) {
        if (this.uploadingItems[i] === item) {
          this.removeProgressBar(this.uploadingItems[i].id);
        }
      };
    };
    this.uploaderService.upload(myUploadItem);
  }

  private progressBar(uploadId, name, progress) {
    let div;

    if (!document.getElementById(uploadId)) {
      this.createProgressBar(uploadId, progress);
    } else {
      this.updateProgressBar(uploadId,progress);
    }
  }

  private createProgressBar(uploadId, progress) {
    //parent div
    let div = document.createElement("div");
    div.setAttribute('id', uploadId);
    div.setAttribute('class', 'progress');
    //child div
    let progressBar = document.createElement("div");
    progressBar.setAttribute('class', 'progress-bar');
    progressBar.style.width = progress + "%";

    div.appendChild(progressBar);
    document.getElementById("progressDiv").appendChild(div);
  }

  private updateProgressBar(uploadId,progress) {
    let progressBar;
    let parentDiv = document.getElementById(uploadId);

    progressBar = parentDiv.getElementsByClassName('progress-bar')[0];
    progressBar.style.width = progress + "%";

    document.getElementById(uploadId).appendChild(progressBar);
  }

  private removeProgressBar(uploadId) {
    let parent = document.getElementById('progressDiv');
    let child = document.getElementById(uploadId);

    parent.removeChild(child);
  }
}
