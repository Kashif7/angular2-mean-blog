import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
//services
import { PostService } from '../post.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageNo: any;
  userId: any;
  userName: string;
  posts: any;
  pageCount: number;
  pageArray: number[] = [];

  constructor(private postService: PostService, private authService: AuthService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     this.activatedRoute.queryParams.subscribe((params: Params) => {
        if(params['userId']) {
          this.userId = params['userId'];
          console.log(this.userId);
        } else {
          this.userId = this.authService.currentUser().id;
          console.log(this.userId);
        }        
      });

    this.pageNo = 1;//remember to change this to one;
    this.userName = this.authService.currentUser().fullname;

    this.getPageCount();
  }

  reload(pageNo) {
    this.pageNo = pageNo;
    this.loadPage();
  }

  private loadPage() {
    this.postService.getPosts(this.userId, this.pageNo).subscribe(posts => {
      console.log(posts);
      this.posts = posts;
    });
  }

  private createPaginateArray() {
    for (let i = 1; i <= this.pageCount; i++) {
      this.pageArray.push(i);
    }
  }

  private getPageCount() {
    this.postService.getPostCount(this.userId).subscribe(response => {
      this.pageCount = response.postCount/3;

      if (response.postCount % 3 != 0) {
        this.pageCount++;
      }

      this.createPaginateArray();
      this.loadPage();
    });
  }

  logout() {
    this.authService.logout();
  }


}
