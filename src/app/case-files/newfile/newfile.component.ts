import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ArbProcessForCreation } from '../../_interfaces/ArbProcessForCreation.Interface';
import { Timestamp } from 'rxjs/internal-compatibility';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { now } from 'moment';
import * as Quill from 'quill'
import { QuillEditorComponent } from 'ngx-quill';
import { Router, Route, ActivatedRoute } from '@angular/router';

import { ArbPaperForCreation } from '../../_interfaces/ArbPaperForCreation.interface';
import { ArbPaper } from '../../_interfaces/ArbPaper.interface';
import { ArbUser } from '../../_interfaces/Users/ArbUser.interface';


@Component({
  selector: 'app-newfile',
  templateUrl: './newfile.component.html',
  styleUrls: ['./newfile.component.scss']
})
export class NewfileComponent implements OnInit {

  public processForm: FormGroup;
  public processDesc: FormGroup;
  private _stage: number = 1;
  
  // privates to build process file
  // Stage 1
  private _arbRegDocRef: string;
  private _plaintiffs: string[];
  private _plaintiffsRep: string[];
  private _defendants: string[];
  private _processAlias: string;
  private _arbiterNumb: number;
  private _arbiterRank: number;
  private _arbiterBadge: string;
  private _processTerm: number;
  private _processAdditionalTerm: number;
  private _processRef: string[];
  private _processInit: number;
  private _processEnd: Date;
  private _processCost: number;

  // Stage 2
  private _processDocumentsArray: ArbPaperForCreation[]   // TODO: Ajustar para ArbPaper depois que API Server estiver funcionando

  // End Privates

  constructor(private _fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.processForm = this._fb.group({
      arbRegDocRef: new FormControl('',[Validators.required, Validators.maxLength(8)]),

      plaintiffs: this._fb.array([
        this.getUser()
      ]),
      plaintiffsRep: this._fb.array([
        this.getUser() // TODO: Change to getUserRep that is not required
      ]),
      defendants: this._fb.array([
        this.getUser()
      ]),
      processAlias: new FormControl(''),
      arbiterNumb: new FormControl('',[Validators.required]),
      arbiterRank: new FormControl('',[Validators.required]),
      arbiterBadge: new FormControl(''),
      processTerm: new FormControl('',[Validators.required]),
      processAdditionalTerm: new FormControl('',[Validators.required]),
      processRef: this._fb.array([
        this.getProcess()
      ]),
      /*
      processCost: processFormValue.processCost, // TODO ajustar para chamar função CalculateProcessCost()
      processDocumentsArray: processFormValue.processDocumentsArray,
      processDocumentsDecisions: null
      */
    });

    this.processDesc = this._fb.group({
      editor: new FormControl('', [Validators.required]),
      pleas: this._fb.array([
        this.getPleas()
      ]),
    });
  }

  /* Create form user */
  private getUser() {
    return this._fb.group({
      name: ['', Validators.required],
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
    const control = <FormArray>this.processForm.controls[unitRef];
    control.push(this.getUser());
  }

  /* Add new process row into form */
  private addProcessRow(unitRef: string ) {
    const control = <FormArray>this.processForm.controls[unitRef];
    control.push(this.getProcess());
  }
  
  private addPleasRow(unitRef: string){
    const control = <FormArray>this.processDesc.controls[unitRef];
    control.push(this.getPleas());
  }

  /* Remove user/process row from form on click delete button */
  private removeRow(i: number, unitRef: string) {
    const control = <FormArray>this.processForm.controls[unitRef];
    control.removeAt(i);
  }

  private removePleasRow(i: number, unitRef: string) {
    const control = <FormArray>this.processDesc.controls[unitRef];
    control.removeAt(i);
  }
  
  /* GENERAL CONTROLS */ 

  // Fileupload HandleChange 
  ​handleChange(event){ }

  // Validation
  public validateControl(controlName: string){
    if (this.processForm.controls[controlName].invalid && this.processForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string){
    if (this.processForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  // Create. Configurations
  public createProcess(processFormValue){
    if (this.processForm.valid) {
      this.executeProcessCreation(processFormValue); // TODO: considerar entre essa função e a saveStageOne()
      this.saveStageOne(processFormValue)
    }
    this.setStage();
  };

  private executeProcessCreation(processFormValue){
    let _timestamp = now();
    let _processCost = 10;
    let newProcess: ArbProcessForCreation = {

      plaintiffs: processFormValue.plaintiffs,
      plaintiffsRep: processFormValue.plaintiffsRep,
      defendants: processFormValue.defendants,
      arbRegDocRef: processFormValue.arbRegDocRef,
      processRef: processFormValue.processRef,
        
      arbiterNumb: processFormValue.arbiterNumb,
      arbiterRank: processFormValue.arbiterRank,
      arbiterBadge: processFormValue.arbiterBadge,
  
      processAlias: processFormValue.processAlias,
      processInit: _timestamp,
      processEnd: null,
      processTerm: processFormValue.processTerm,
      processAdditionalTerm: processFormValue.processAdditionalTerm,
      processCost: _processCost, // TODO ajustar para chamar função CalculateProcessCost()     
      
    }
    console.log(newProcess);

    // TODO - Subscribe to database
    // let apiUrl = 'api/owner';
    // this.repository.create(apiUrl, owner)
    //   .subscribe(res => {
    //     $('#successModal').modal();
    //   },
    //   (error => {
    //     this.errorHandler.handleError(error);
    //     this.errorMessage = this.errorHandler.errorMessage;
    //   })
    // )
  };

  private saveStageOne(processFormValue){        
    this._plaintiffs = processFormValue.plaintiffs;
    this._plaintiffsRep = processFormValue.plaintiffsRep;
    this._defendants = processFormValue.defendants;
    this._arbRegDocRef = processFormValue.arbRegDocRef;
    this._processRef = processFormValue.processRef;   
    this._arbiterNumb = processFormValue.arbiterNumb;
    this._arbiterRank = processFormValue.arbiterRank;
    this._arbiterBadge = processFormValue.arbiterBadge;
    this._processAlias = processFormValue.processAlias;
    this._processInit = now();
    this._processEnd = null;
    this._processTerm = processFormValue.processTerm;
    this._processAdditionalTerm = processFormValue.processAdditionalTerm;
    this._processCost = 10;
  }


  public addProcessDescription(processDescValue){
    if (this.processDesc.valid) {
      this.executeAddProcessDescription(processDescValue);
    }
    this.setStage();
  };

  private executeAddProcessDescription(processDescValue){
    // TODO
    this.createArbPaper(processDescValue)
    console.log("TODO: Adicionar petição inicial e documentos")
  }

  private createArbPaper(processDescValue){
    let newArbPaper: ArbPaperForCreation = {
      author: this._plaintiffs,
      body: this.processDesc.controls.editor.value,
      attachments: "TODO attachments", // TODO: check if format is correct
      decision: false,
      adminRuling: false
    }
    console.log(newArbPaper)
    this._processDocumentsArray.push(newArbPaper)
  }

  // Phase controller
  private setStage(){
    this._stage += 1;
    //    this.router.navigate(['../2'], {relativeTo: this.route})
  }

  private returnStage(){
    this._stage -= 1;
  }

}
