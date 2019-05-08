import { PaginaNaoEncontradaComponent } from './../pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdministracaoComponent } from './administracao.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NewsComponent } from './news/news.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'administracao', component: AdministracaoComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: '/administracao/home', pathMatch: 'full', canActivate: [AuthGuard]},
      { path: 'home', component: AdmHomeComponent, canActivate: [AuthGuard]},
      { path: 'carousel', component: CarouselComponent, canActivate: [AuthGuard]},
      { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard]},
      { path: 'news', component: NewsComponent, canActivate: [AuthGuard]},
      { path: 'newsletter', component: NewsletterComponent, canActivate: [AuthGuard]},
      { path: '**', component: PaginaNaoEncontradaComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracaoRoutingModule { }
