import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// COMPONENTS
import { PaginaNaoEncontradaComponent } from './../pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { LoginComponent } from './login/login.component';
import { AdministracaoComponent } from './administracao.component';
import { CarouselListComponent } from './carousel/carousel-list.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { UsuarioListaComponent } from './usuarios/usuario-lista/usuario-lista.component';
import { AgendaListComponent } from './agenda/agenda-list/agenda-list.component';
import { NoticiasContentComponent } from './noticias/noticias-content.component';
import { NoticiasFormComponent } from './noticias/noticias-form/noticias-form.component';
import { NoticiasListComponent } from './noticias/noticias-list/noticias-list.component';

const routes: Routes = [
  {
    path: 'administracao', 
    component: AdministracaoComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'home', component: AdmHomeComponent, canActivate: [AuthGuard] },
      { path: 'carousel', component: CarouselListComponent, canActivate: [AuthGuard]  },
      { path: 'agenda', component: AgendaListComponent, canActivate: [AuthGuard]  },
      { path: 'noticias', component: NoticiasListComponent, canActivate: [AuthGuard] },
      { path: 'noticias/:id', component: NoticiasFormComponent, canActivate: [AuthGuard] },
      { path: 'newsletter', component: NewsletterComponent, canActivate: [AuthGuard]  },
      { path: 'usuario', redirectTo: 'usuario/lista', pathMatch: 'full', canActivate: [AuthGuard]  },
      { path: 'usuario/lista', component: UsuarioListaComponent, canActivate: [AuthGuard]  },
      { path: 'usuario/**', component: PaginaNaoEncontradaComponent },
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
