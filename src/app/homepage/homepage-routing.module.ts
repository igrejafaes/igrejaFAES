import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
