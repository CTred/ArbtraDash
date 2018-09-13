import { ErrorHandlerService } from '../../shared-arbtra/services/error-handler.service';
import { ArbRegDocForCreation } from '../../_interfaces/ArbRegDocForCreation.interface';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ArbProcessForCreation } from '../../_interfaces/ArbProcessForCreation.Interface';
import { Timestamp } from 'rxjs/internal-compatibility';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { now } from 'moment';
import * as Quill from 'quill'
import { QuillEditorComponent } from 'ngx-quill';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../shared-arbtra/services/repository.service';

@Component({
  
  templateUrl: './newdoc.component.html',
  styleUrls: ['./newdoc.component.scss']
})
export class NewDocComponent implements OnInit {

  public errorMessage: string;
  public documentForm: FormGroup;
  private _arbRegDocForCreation: ArbRegDocForCreation
  public uploadCheckBox: boolean
  
  public selectedOption: number;
  options = [
    { value: 1, label: 'days' },
    { value: 30, label: 'months' },
    { value: 360, label: 'years' },
  ];
  // End Privates

  constructor(
    private _fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private repository: RepositoryService, private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {

    this.documentForm = this._fb.group({
            
      name: new FormControl(''),
      documentParties: this._fb.array([
        this.getUser()
      ]),
      expiryDate: new FormControl('',[Validators.required]),
      selectedOption: new FormControl('',[Validators.required]),
      arbiterNumb: new FormControl('',[Validators.required]),
      arbiterRank: new FormControl('',[Validators.required]),
      arbiterBadge: new FormControl(''),
      processTerm: new FormControl('',[Validators.required]),
      processAdditionalTerm: new FormControl('',[Validators.required]),

    });
  }

  /* Create form user */
  private getUser() {
    return this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      guid: ['', Validators.required]
    });
  }

  /* Create form process reference */
  private getProcess() {
    return this._fb.group({
      processRefID: [''],
    });
  }

  private getPleas() {
    return this._fb.group({
      request: ['', [Validators.required, Validators.maxLength(150)]],
    });
  }

  /* Add new user row into form */
  private addRow(unitRef: string ) {
    const control = <FormArray>this.documentForm.controls[unitRef];
    control.push(this.getUser());
  }

  /* Add new process row into form */
  private addProcessRow(unitRef: string ) {
    const control = <FormArray>this.documentForm.controls[unitRef];
    control.push(this.getProcess());
  }

  /* Remove user/process row from form on click delete button */
  private removeRow(i: number, unitRef: string) {
    const control = <FormArray>this.documentForm.controls[unitRef];
    control.removeAt(i);
  }
  
  /* GENERAL CONTROLS */ 

  // Fileupload HandleChange 
  ​handleChange(event){ }

  // Validation
  public validateControl(controlName: string){
    if (this.documentForm.controls[controlName].invalid && this.documentForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string){
    if (this.documentForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  // Create. Configurations
  public registerDocument(documentFormValue){
    if (this.documentForm.valid) {
      this.executeDocumentRegistration(documentFormValue); // TODO: considerar entre essa função e a saveStageOne()
    }
  };

  private executeDocumentRegistration(documentFormValue){
    let apiUrl = 'arbRegDoc'
    let _timestamp = now();
    let _processCost = 10;
    let _duration = documentFormValue.expiryDate * documentFormValue.selectedOption.value
    let newDocument: ArbRegDocForCreation = {

      name: documentFormValue.name,
      documentParties: documentFormValue.documentParties,
      registeredDate: _timestamp,
      duration: _duration,
      expiryDate: documentFormValue.expiryDate,
        
      arbiterNumb: documentFormValue.arbiterNumb,
      arbiterRank: documentFormValue.arbiterRank,
      arbiterBadge: documentFormValue.arbiterBadge,
  
      processTerm: documentFormValue.processTerm,
      processAdditionalTerm: documentFormValue.processAdditionalTerm,

      pointer: null,
      disclosure: 'NA'

      
    }
    this.repository.create(apiUrl, newDocument)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
    console.log(newDocument);
  };
}

