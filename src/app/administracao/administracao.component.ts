import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.scss']
})
export class AdministracaoComponent implements OnInit {

  //loggedIn: boolean = false

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUser().then((res) => {
      //console.log(res)
      this.authService.emitChange(res.email)
    }, rej => {
      //console.log('not logged')
      this.authService.emitChange(null)
    })
  }

  fazerLogOut() {
    //this.subscriptions.unsubscribe;
    this.router.navigate(['/home']);
    this.authService.doLogout();
  }

}
