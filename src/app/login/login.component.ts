import { Component, OnInit } from '@angular/core';
//datatype class
import { Login } from './login';
//authentication service
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./style.css','./forms.css']
})
export class LoginComponent implements OnInit {

  loginCred = new Login("","");
  success : boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit = () => {
    this.success = !this.authService.login(this.loginCred);
  }

}
