import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SlickCarouselModule } from 'ngx-slick-carousel';

// PIPES
import { FirestoreDatePipe } from './pipes/firestore-date.pipe';

// COMPONENTS
import { EmConstrucaoComponent } from './em-construcao/em-construcao.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

// DIRECTIVES
import { ReturnToTabDirective } from './directives/return-to-tab.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    SlickCarouselModule,
    RouterModule
  ],
  declarations: [
    EmConstrucaoComponent,
    FirestoreDatePipe,
    AlertModalComponent,
    ConfirmModalComponent,
    ReturnToTabDirective,
    AutoFocusDirective,
  ],
  exports: [
    MDBBootstrapModule,
    SlickCarouselModule,
    EmConstrucaoComponent,
    FirestoreDatePipe,
    AlertModalComponent,
    ReturnToTabDirective,
    AutoFocusDirective
  ],
  entryComponents: [
    AlertModalComponent,
    ConfirmModalComponent
  ],
  providers: []
})
export class SharedModule { }
