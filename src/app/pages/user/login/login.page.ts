import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Util } from 'src/app/models/util';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();

  constructor(private userService: UserService, private router: Router,
    public toastController: ToastController, private alertController: AlertController,
    private skillService: SkillsService, public loadingController: LoadingController) { }

  ngOnInit() {

  }

  async errorLogin(head: string, subHead: string, btnTex: string, navigate: string) {
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
      color: 'myPrimary',
      duration: time
    });
    toast.present();
  }

  getSkill(id: string) {
    this.skillService.getSkill(id).subscribe((res) => {
      if (res.status) {
        Util.setStorageSkill(res.data);
      }
    }, (err) => {
      console.log(err);
    });
  }

  async verifyUser() {
    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
    });

    await loading.present();

    this.userService.getUser(this.user.email).subscribe((res) => {
      if (res.data == null) {
        this.toast('Email no registrado!', 'Intenta de nuevo o crea una cuenta para poder entrar!', 3000);
        this.router.navigate(['/login']);
        this.user.email = '';
        this.user.password = '';
        loading.dismiss();
      } else {
        if (res.data.password === this.user.password) {
          this.toast('Bienvenido al foro', '', 1000);

          Util.setStorageUser(res.data);
          this.getSkill(res.data._id);

          this.router.navigate(['/events']);

        } else {
          this.toast('Contraseña incorrecta!', 'La contraseña que ingreso no coincide con el email', 2000);
          this.router.navigate(['/login']);
          this.user.password = '';
        }
        loading.dismiss();
      }
    },
      (err) => {
        this.errorLogin('ERROR DE SERVIDOR', err.message, 'OK', 'login');
        loading.dismiss();

      }
    );
  }



}
