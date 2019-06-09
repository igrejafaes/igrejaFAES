import { Component, OnInit } from '@angular/core';
//import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'app';
  // isAdm: boolean = false

  // constructor(private router: Router) {  }

  // ngOnInit(): void {
  //   this.router.events.subscribe((val) => {
  //     if(val instanceof NavigationEnd){
  //       this.checkRoterURL(val.url)
  //     }
  //   });
  // }

  // checkRoterURL(url: string){
  //   // check if router is 'administracao' to change isAdm
  //   this.isAdm = url.substring(0, 14) === '/administracao'
  // }

}
