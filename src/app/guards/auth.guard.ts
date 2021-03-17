import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, generate } from 'rxjs';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
import { Util } from '../models/util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private alertController: AlertController) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = Util.getStorageUser();
    const response = this.getUser(user._id);

    return response.then(resolve => {

      const path = next.url[0].path;

      if (resolve === true) {

        switch (path) {
          case 'login':
            return this.router.navigate(['/events/']);

          case 'branches':
            if (user.permission === 1) {
              return true;
            }
            return this.router.navigate(['/events/']);

          case 'users':
            if (user.permission === 1) {
              return true;
            }
            return this.router.navigate(['/events/']);

          default:
            return true;
        }

      } else {
        if (path === 'login') {
          return true;
        } else {
          this.alert();
          return this.router.navigate(['/login/']);
        }
      }
    });

  }

  async getUser(id: string) {
    return new Promise((resolve, reject) => {
      this.userService.getUserById(id).subscribe((res) => {
        if (res.status && res.data !== null) {
          Util.setStorageUser(res.data);
          resolve(true);
        } else {
          resolve(false);
        }
      }, (err) => {
        reject(false);
      });
    });
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Lo sentimos.',
      subHeader: 'Necesitas iniciar sesion para poder ver esto.',
      buttons: ['OK']
    });

    await alert.present();
    Util.removeStorageUser();
  }

}
