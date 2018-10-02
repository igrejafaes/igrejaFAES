import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    SlickCarouselModule
  ],
  declarations: [],
  exports: [
    MDBBootstrapModule,
    SlickCarouselModule
  ]
})
export class SharedModule { }
