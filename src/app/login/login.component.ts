import { Component, OnInit } from '@angular/core';
//datatype class
import { Login } from './login';
//authentication service
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./style.css']
})
export class LoginComponent implements OnInit {

  loginCred = new Login("","");

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit = () => {
    console.log(this.loginCred);
    this.authService.login(this.loginCred);
  }

   get diagnostic() { return JSON.stringify(this.loginCred); }

}
