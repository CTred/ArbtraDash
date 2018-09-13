import { pgSelectModule } from '../@pages/components/select/select.module';
import { pgDatePickerModule } from '../@pages/components/datepicker/datepicker.module';
import { QuillModule } from 'ngx-quill';
//Angular Dependencies
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Router
import { DocRegisterRoute }from './doc-register.routing';

import { pgCardSocialModule } from '../@pages/components/card-social/card-social.module';
import { pgCardModule } from '../@pages/components/card/card.module';
import { pgUploadModule } from '../@pages/components/upload/upload.module';
import { pgSwitchModule } from '../@pages/components/switch/switch.module';
import { SharedModule } from '../@pages/components/shared.module';

import { SharedArbtraModule } from '../shared-arbtra/shared-arbtra.module';
import { ViewDocsComponent } from './viewdocs/viewdocs.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NewDocComponent } from './newdoc/newdoc.component';
import { pageContainer } from '../@pages/components/container/page-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DocRegisterRoute),
    FormsModule,
    ReactiveFormsModule,
    SharedArbtraModule,
    SharedModule,
    pgCardModule,
    pgCardSocialModule,
    pgUploadModule,
    pgSwitchModule,
    pgSelectModule,
    NgxDatatableModule,
    QuillModule,

    
  ],
  
  declarations: [
    ViewDocsComponent, NewDocComponent   
  ],

  exports:[
    ViewDocsComponent, RouterModule
  ]


})
 
export class DocRegisterModule { }
