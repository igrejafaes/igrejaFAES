import { AuthService } from './../auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar-adm',
  templateUrl: './navbar-adm.component.html',
  styleUrls: ['./navbar-adm.component.scss']
})
export class NavbarAdmComponent implements OnInit {

  logged: boolean = false

  menuList: any[] = [
    { path: '/administracao/carousel', title: 'Carrossel', icon: 'add_a_photo' },
    { path: '/administracao/agenda', title: 'Agenda', icon: 'update' },
    { path: '/administracao/noticias', title: 'Notícias', icon: 'event' },
    { path: '/administracao/newsletter', title: 'Newsletter', icon: 'email' },
    { path: '/administracao/usuario', title: 'Usuários', icon: 'email' },
  ];

  @Output() LogOut = new EventEmitter();

  constructor(private service: AuthService) { }

  ngOnInit() {
    this.service.usuarioChange$.subscribe((user) => {
      if (user === null) {
        this.logged = false
      } else {
        this.logged = true
      }
    })
  }

  fazerLogOut() {
    this.LogOut.emit()
  }

}
