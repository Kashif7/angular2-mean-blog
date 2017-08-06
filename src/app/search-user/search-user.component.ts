import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service'
import  { Router } from '@angular/router';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  name: string;
  userName: string;
  notFound: boolean = false;

  constructor(private userService: UserService,private router: Router,private authService: AuthService) {}

  search() {
    this.userService.getUser(this.name).subscribe(user => {
      if (!user.msg) {
        this.router.navigate(['user'], { queryParams: { userId: user.userId}});
      } else {
        this.notFound = true;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.userName = this.authService.currentUser().fullname;
  }

}
