import { Component, OnInit } from '@angular/core';
//datatype class
import { Registration } from './registration';
//authentication service
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./style.css']
})
export class RegistrationComponent implements OnInit {

  regCred = new Registration("","","");

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit = () => {
    console.log(this.regCred);
    this.authService.register(this.regCred);
  }

   get diagnostic() { return JSON.stringify(this.regCred); }

}
