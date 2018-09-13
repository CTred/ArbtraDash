import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';


// Caio Imports
import { FormsModule } from '@angular/forms';
import { ArbWhatsThisComponent } from './components/arb-whats-this/arb-whats-this.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    ArbWhatsThisComponent,
    ErrorModalComponent,
    SuccessModalComponent
  ],

  exports:[
    ArbWhatsThisComponent,
    ErrorModalComponent,
    SuccessModalComponent
  ]

})
export class SharedArbtraModule { }
