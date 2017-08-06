import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import  { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http: Http,private router: Router) { }

  register(registerDetails) {
    this.http.post('/api/auth/register', registerDetails).map(res =>
      res.json()
    ).subscribe(res => {
      this.saveToken(res.token);
      this.router.navigate(['/dashboard']);
    });
  }

  login(loginDetails) {
    this.http.post('/api/auth/login', loginDetails).map(res =>
      res.json()
    ).subscribe(res => {
      this.saveToken(res.token);
      this.router.navigate(['/dashboard']);
    });
  }

  logout() {
    localStorage.removeItem('mean-token');
     this.router.navigate(['/login']);
  }

  private saveToken(token) {
    localStorage.setItem('mean-token', token);
  }

  private getToken() {
    let x = localStorage.getItem('mean-token');
    return x;
  }

  isLoggedIn() {
    let token = this.getToken();
    let payload;

    if (token) {
      payload = token.split('.')[1];
      payload = atob(payload);
      let decodedPayload = JSON.parse(payload);

      return decodedPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  currentUser() {
    let token = this.getToken();
    let payload = token.split('.')[1];
    payload = atob(payload);
    let decodedPayload = JSON.parse(payload);

    return {
      id: decodedPayload.id,
      fullname: decodedPayload.fullname
    }
  }
}
