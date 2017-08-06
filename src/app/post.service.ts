import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  getPosts(userId,pageNo) {
    return this.http.get('/api/users/' + userId+'/posts?page='+pageNo).map(res => res.json());
  }

  addPost(userId,newPost) {
    this.http.get('/api/users/' + userId, '/posts').map(res => res.json()).subscribe( res => {
      alert("successful");
    });
  }

  getPostCount(userId) {
    return this.http.get('/api/users/' + userId+'/count').map(res => res.json());
  }
}
