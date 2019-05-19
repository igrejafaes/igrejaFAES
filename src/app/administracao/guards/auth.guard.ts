import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
//import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(    
    private authService: AuthService,
    private router: Router
    ) { }
  

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
        this.authService.getCurrentUser()
          .then(user => {
            return resolve(true);
          }, err => {
            this.router.navigate(['/administracao/login'])
            return reject(err);
          })
      })
    }

}
