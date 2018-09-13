import { ArbUserForAuth } from './../_interfaces/Users/ArbUserForAuth';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../shared-arbtra/services/alert.service';
import { AuthenticationService } from '../shared-arbtra/services/authentication.service';
import { RepositoryService } from '../shared-arbtra/services/repository.service';


@Component({templateUrl: './login.component.html'})
export class LoginComponent implements OnInit {

  private userForAuth: ArbUserForAuth

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private repository: RepositoryService) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  public login(loginFormValue) {
    if (this.loginForm.valid) {
      this.executeLogin(loginFormValue);
    }
  }

  private executeLogin(loginFormValue){
    this.authenticationService.login(loginFormValue.email, loginFormValue.password)
      .pipe(first())
      .subscribe()
    if (this.authenticationService.checkUserLogin()){
      this.router.navigate(['/dashboard/welcome'])
    }
  }

  // Validation
  public validateControl(controlName: string){
    if (this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string){
    if (this.loginForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }
}