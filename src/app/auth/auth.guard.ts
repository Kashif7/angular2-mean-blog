import { Injectable } from '@angular/core';
import  { Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private Router: Router,private authService: AuthService){}

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn()) {
            console.log(this.authService.isLoggedIn());
            this.Router.navigate(['/dashboard']);
            return true;
        }
        this.Router.navigate(['/login']);
        return false;
    }
}