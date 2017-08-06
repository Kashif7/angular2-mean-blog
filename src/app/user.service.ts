import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import  { Router } from '@angular/router';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get('/api/users').map(res => res.json());
  }

  getUser(name) {
    return this.http.get('/api/users?name='+name).map(res => res.json());
  }
}
