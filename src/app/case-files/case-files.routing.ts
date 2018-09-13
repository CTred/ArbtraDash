import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NewfileComponent } from './newfile/newfile.component';


export const CaseFilesRoute: Routes = [
  {
    path: '',
    children: [{
      path: 'newfile', component: NewfileComponent
      }]

    },/*{
      path: 'register',
      component: 
    },{
      path: 'error/:type',
      component: 
    },{
      path: 'lock',
      component: 
    }*/
]

