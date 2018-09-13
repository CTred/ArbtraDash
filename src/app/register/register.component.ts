import { ErrorHandlerService } from './../shared-arbtra/services/error-handler.service';
import { ArbUserForCreation } from './../_interfaces/Users/ArbUserForCreation';
import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { now } from 'moment';
import { RepositoryService } from '../shared-arbtra/services/repository.service';
import { AlertService } from '../shared-arbtra/services/alert.service'; 


 
@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    public errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private repository: RepositoryService,
        private errorHandler: ErrorHandlerService) { }
 
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],            
            password: ['', [Validators.required, Validators.minLength(8)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
            email: ['', Validators.required],
        });
    }
 
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
 

    public newAccount(registerFormValue){
      if (this.registerForm.valid){
        this.executeNewAccount(registerFormValue);
      }
    }

    private executeNewAccount(registerFormValue) {
      let apiURL = 'arbUser'
      let _timestamp = Date.now();   
      let newUser: ArbUserForCreation = {
        firstName: registerFormValue.firstName,
        lastName: registerFormValue.lastName,
        email: registerFormValue.email,
        password: registerFormValue.password,
        dateCreated: _timestamp,

      }  
      this.repository.create(apiURL, newUser)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
    console.log(newUser);
  };

  // Validation
  public validateControl(controlName: string){
    if (this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string){
    if (this.registerForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  private passwordToHash(pass){

  }
}