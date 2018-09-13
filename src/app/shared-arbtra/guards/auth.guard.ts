import { AuthenticationService } from './../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router,
        private authservice: AuthenticationService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
        
        console.log("canActivateCheck:", this.authservice.checkUserLogin())
        if (this.authservice.checkUserLogin()) {            
            
            return true;            
        }
 
        // not logged in  redirect to login page with the return url
        this.router.navigate(['/dashboard/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}