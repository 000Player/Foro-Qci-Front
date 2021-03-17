import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {

  user = new User();
  bandera = false;

  constructor(private userService: UserService, public alertController: AlertController,
    private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  async failedAccount(head: string, subHead: string, btnTex: string, navigate: string) {
    const alert = await this.alertController.create({
      header: head,
      subHeader: subHead,
      buttons: [{
        text: btnTex,
        handler: () => {
          this.router.navigate(['/' + navigate + '/']);
        }
      }]
    });

    await alert.present();
  }

  async toast(head: string, msg: string, time: number) {
    const toast = await this.toastController.create({
      header: head,
      message: msg,
      color: 'primary',
      duration: time,
    });
    toast.present();
  }

  verifyPassword(password) {
    const lenght1 = this.user.password.length;
    const lenght2 = password.length;

    if (lenght1 === lenght2) {
      if (this.user.password !== password) {
        this.bandera = false;
        this.toast('Error,', 'Las contraseñas no coinciden', 2000);
      }
      else {
        this.bandera = true;
      }
    }
    else {
      this.bandera = false;
    }
  }

  verifyNewUser() {
    this.userService.getUser(this.user.email).subscribe((res) => {
      if (res.data !== null) {
        this.toast('Error', 'La dirección de correo electrónico que ingreso ya esta registrada. Intente de nuevo', 4000);
        this.user.email = ' ';
      }
      else {
        this.addUser();
      }
    },
      (err) => {
        this.failedAccount('ERROR DE SERVIDOR', err.message, 'OK', 'new-account');
      }
    );
  }

  addUser() {
    this.user.active = true;
    this.user.age = 0;
    this.user.permission = 0;
    this.user.code = ' ';
    this.user.career = ' ';

    this.userService.postUser(this.user).subscribe(async (res) => {
      if (res.status) {
        this.router.navigate(['/skill-form/' + res.data._id]);
      } else {
        this.failedAccount('¡ERROR AL CREAR!', 'Hubo un problema al intentar crear este usuario', 'OK', 'login');
      }
    }, (err) => {
      this.failedAccount('ERROR DE SERVIDOR', err.message, 'OK', 'new-account');
    });
  }

}
