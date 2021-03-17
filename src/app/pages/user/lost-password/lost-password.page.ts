import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.page.html',
  styleUrls: ['./lost-password.page.scss'],
})
export class LostPasswordPage implements OnInit {

  email: string = '';
  constructor(private userService: UserService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async navigateAlert(head: string, subHead: string, btnTex: string, navigate: string) {
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


  lostPassord() {
    this.userService.lostPass(this.email).subscribe((res) => {
      if (res.status) {
        this.navigateAlert('¡RECUPERACION EXITOSA!', 'Hemos envidado un correo a tu email.', 'OK', 'login');
      } else {
        this.navigateAlert('¡PROBLEMA CON EL CORREO!', 'Hubo un problema al enviar el correo, vuelve a intentarlo.', 'OK', 'lost-password');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'events');
    });

    this.email = '';


  }

}
