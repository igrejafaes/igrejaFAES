import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// COMPONENTS
import { PaginaNaoEncontradaComponent } from './../pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { LoginComponent } from './login/login.component';
import { AdministracaoComponent } from './administracao.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NewsComponent } from './news/news.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

const routes: Routes = [
  {
    path: 'administracao', 
    component: AdministracaoComponent,
    children: [
      //{ path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioModule' },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: AdmHomeComponent, canActivate: [AuthGuard] },
      { path: 'carousel', component: CarouselComponent, canActivate: [AuthGuard]  },
      { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard]  },
      { path: 'news', component: NewsComponent, canActivate: [AuthGuard]  },
      { path: 'newsletter', component: NewsletterComponent, canActivate: [AuthGuard]  },
      { path: '', redirectTo: '/administracao/home', pathMatch: 'full', canActivate: [AuthGuard]  },
      { path: '**', component: PaginaNaoEncontradaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracaoRoutingModule { }
