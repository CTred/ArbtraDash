import { filter } from 'rxjs/operators/filter';
import { ArbUser } from './../../_interfaces/Users/ArbUser.interface';
import { ArbUserForAuth } from './../../_interfaces/Users/ArbUserForAuth';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';
import { RepositoryService } from './repository.service';


@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {
    
    private authUser: boolean = false
    private arbUsers: ArbUser[]
    

    constructor(private http: HttpClient, private apiUrl: EnvironmentUrlService,
        private repository: RepositoryService ) { }
 
    public login(email: string, password: string){
        return this.repository.getData('arbUser')
            .pipe(map(v = v as ArbUser)
                
            ))
            .subscribe(res => { this.arbUsers = res as ArbUser[]}
            )

        for (let index = 0; index < this.arbUsers.length; index++) {
            const user = this.arbUsers[index]
            if (password == user.password && email == user.email ) {
                this.authUser = true
                console.log("user:", user)
                console.log("authcheck:", this.authUser)
                break
            }
            else{
                this.authUser = false
            }
        };
    }

    public logout() {
        // remove user from local storage to log user out
        this.authUser = false;
    }

    public checkUserLogin(){
        return this.authUser;
    }
}