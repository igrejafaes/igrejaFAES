import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { EmConstrucaoComponent } from './em-construcao/em-construcao.component';
import { RouterModule } from '@angular/router';
import { FirestoreDatePipe } from '../pipes/firestore-date.pipe';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ReturnToTabDirective } from './return-to-tab.directive';

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
    ReturnToTabDirective,
  ],
  exports: [
    MDBBootstrapModule,
    SlickCarouselModule,
    EmConstrucaoComponent,
    FirestoreDatePipe,
    AlertModalComponent,
    ReturnToTabDirective
  ],
  entryComponents: [
    AlertModalComponent
  ],
  providers: []
})
export class SharedModule { }
