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
    { path: 'carousel', title: 'Carrossel', icon: 'add_a_photo' },
    { path: 'schedule', title: 'Agenda', icon: 'update' },
    { path: 'news', title: 'Notícias', icon: 'event' },
    { path: 'newsletter', title: 'Newsletter', icon: 'email' },
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
