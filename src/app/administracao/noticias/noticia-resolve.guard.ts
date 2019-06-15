import { NoticiaService } from 'src/app/services/noticia.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Noticia } from 'src/app/models/clNoticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaResolveGuard implements Resolve<Noticia> {

  constructor(private service: NoticiaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Noticia> {
    
    const inserir = route.url[1].path === 'inserir'

    if ( !inserir && route.params && route.params['id']) {
      return this.service.getNoticiasByID(route.params['id']);
    }

    // return observable from object
    return Promise.resolve({
      id: '',
      titulo: null,
      noticiaData: null,
      descricao: null,
      imageURL: null,
      imageName: null,
      filial: null
    })

  }
  
}
