import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ViewDocsComponent } from './viewdocs/viewdocs.component';
import { NewDocComponent } from './newdoc/newdoc.component';


export const DocRegisterRoute: Routes = [
  {
    path: '',
    children: [
      { path: 'newdocreg', component: NewDocComponent },
      { path: 'viewdocs', component: ViewDocsComponent }
    ]

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

