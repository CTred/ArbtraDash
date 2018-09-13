//Angular Dependencies
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Router
import { CaseFilesRoute }from './case-files.routing';

import { pgCardSocialModule } from '../@pages/components/card-social/card-social.module';
import { pgCardModule } from '../@pages/components/card/card.module';
import { pgUploadModule } from '../@pages/components/upload/upload.module';
import { pgSwitchModule } from '../@pages/components/switch/switch.module';
import { SharedModule } from '../@pages/components/shared.module';

import { SharedArbtraModule } from '../shared-arbtra/shared-arbtra.module';
import { QuillModule } from 'ngx-quill';
import { NewfileComponent } from './newfile/newfile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CaseFilesRoute),
    ReactiveFormsModule,
    SharedArbtraModule,
    SharedModule,
    pgCardModule,
    pgCardSocialModule,
    pgUploadModule,
    pgSwitchModule,
    QuillModule
  ],
  
  declarations: [
    NewfileComponent,    
  ],

  exports:[
    NewfileComponent, RouterModule
  ]


})
 
export class CaseFilesModule { }
