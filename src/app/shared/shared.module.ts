import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { EmConstrucaoComponent } from './em-construcao/em-construcao.component';
import { RouterModule } from '@angular/router';
import { FirestoreDatePipe } from '../pipes/firestore-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    SlickCarouselModule,
    RouterModule
  ],
  declarations: [
    EmConstrucaoComponent,
    FirestoreDatePipe
  ],
  exports: [
    MDBBootstrapModule,
    SlickCarouselModule,
    EmConstrucaoComponent,
    FirestoreDatePipe
  ]
})
export class SharedModule { }
