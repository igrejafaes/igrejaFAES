import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { EmConstrucaoComponent } from './em-construcao/em-construcao.component';
import { RouterModule } from '@angular/router';
import { FirestoreDatePipe } from '../pipes/firestore-date.pipe';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

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
  ],
  exports: [
    MDBBootstrapModule,
    SlickCarouselModule,
    EmConstrucaoComponent,
    FirestoreDatePipe,
    AlertModalComponent
  ],
  entryComponents: [
    AlertModalComponent
  ],
  providers: []
})
export class SharedModule { }
