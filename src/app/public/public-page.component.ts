import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.scss']
})
export class PublicPageComponent implements OnInit {

  title = 'app';

  constructor() {  }

  ngOnInit(): void {
    // this.router.events.subscribe((val) => {
    //   if(val instanceof NavigationEnd){
    //     this.checkRoterURL(val.url)
    //   }
    // });
  }

  // checkRoterURL(url: string){
  //   // check if router is 'administracao' to change isAdm
  //   //this.isAdm = url.substring(0, 14) === '/administracao'
  // }

}
