import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-adm',
  templateUrl: './navbar-adm.component.html',
  styleUrls: ['./navbar-adm.component.scss']
})
export class NavbarAdmComponent implements OnInit {

  menuList: any[] = [
    { path: 'carousel', title: 'Carrossel',  icon: 'add_a_photo' },
    { path: 'schedule', title: 'Agenda',  icon: 'update' },
    { path: 'news', title: 'Notícias',  icon: 'event' },
    { path: 'newsletter', title: 'Newsletter',  icon: 'email' },
];

  constructor() { }

  ngOnInit() {
  }

}
