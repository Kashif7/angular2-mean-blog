import { Component, OnInit } from '@angular/core';
//services
import { PostService } from '../post.service';
@Component({
  selector: 'app-home',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class HomeComponent implements OnInit {
  pageNo: any;
  posts: any;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.pageNo = 5;//remember to change this to one
    
    this.postService.getPosts(2,5).subscribe(posts => {
      console.log(posts);
      this.posts = posts;
    });
  }

}
