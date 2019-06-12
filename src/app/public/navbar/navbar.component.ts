import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isIgrejaRoute: boolean = false; // active css when route Igreja
  isDepartamentoRoute: boolean = false; // active css when route Departamento
  router$: Subscription

  constructor(private router: Router){}

  ngOnInit(): void {
    // subscribe to check 'router' igreja or 'departamento'
    this.router$ = this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.checkRoterURL(val.url)
      }
    });
  };

  checkRoterURL(url: string){
    this.isIgrejaRoute = url.substring(0, 7) === '/igreja'
    this.isDepartamentoRoute = url.substring(0, 13) === '/departamento'
  };

  ngOnDestroy(): void {
    this.router$.unsubscribe()
  }

}
