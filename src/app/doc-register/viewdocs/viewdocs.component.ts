import { ErrorHandlerService } from '../../shared-arbtra/services/error-handler.service';
import { ArbRegDoc } from '../../_interfaces/ArbRegDoc.interface';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
// import { FormsModule, FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../shared-arbtra/services/repository.service';

@Component({
  templateUrl: './viewdocs.component.html',
  styleUrls: ['./viewdocs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewDocsComponent implements OnInit {
  
  // TABELA DEMO 1
  basic_table_data;
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  columns = [
    { prop: 'title', name: 'teste' },
    { name: 'Places' },
    { name: 'Activities', sortable: false },
    { name: 'Details', sortable: false },
    { name: 'Status'},
    { name: 'lastUpdate'}
  ];

  // TABELA DEMO 2
  @ViewChild('myTable') table: any;
  rows2 = [
    { },
    { },
    { },
    { },
    { },
    { },
    { },
    { },    
    ];

  columns2 = [
    { prop: 'id', name: 'teste' },
    { name: 'Name' },
    { name: 'Gender', sortable: false },
    { name: 'Age', sortable: false },
  ];
  expanded: any = {};
  timeout: any;

  // ACTUAL 
  public arbRegDocs: ArbRegDoc[];
  public errorMessage: string = ""

  constructor(  private repository: RepositoryService,
                private errorHandler: ErrorHandlerService
              ) 
              { 
                this.fetch((data) => {
                  this.rows = data;
                  this.rows2 = data;
                  setTimeout(() => { this.loadingIndicator = false; }, 1500);
                });

                this.getAllArbRegisteredDocs();    
              }

  ngOnInit() {
 
    
    
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  
  onActivate(event){
    console.log(event)
  }

  onSelect(event){
    console.log(event)
  }

  onCheckboxChangeFn(event){
    console.log(event)
  }

  public getAllArbRegisteredDocs(){
    let apiAddress: string = "arbRegDoc";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.arbRegDocs = res as ArbRegDoc[];
      console.log(res)
      this.arbRegDocs.forEach(regdoc => {
        console.log("iniciando leitura de linha")
        regdoc.documentParties.forEach(party => {
          console.log(party)
        })
      });
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
}


