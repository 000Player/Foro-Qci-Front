import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  usersList = new Array<User>();
  constructor(private userService: UserService, public actionSheetController: ActionSheetController,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUsers();
  }

  async confirmPermission(pmsn: number, id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡CONFIRMAR!',
      message: '¿Estas seguro que deseas conceder el permiso de ' + ((pmsn === 0) ? ' solo USUARIO' : 'ADMINISTRADOR') + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Si',
          cssClass: 'success',
          handler: () => {
            this.changePermission(pmsn, id);
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmDelete(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡CONFIRMAR!',
      message: '¿Estas seguro que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Si',
          role: 'danger',

          handler: () => {
            this.deleteUser(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheet(id: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Permisos',
      mode: 'ios',
      buttons: [{
        text: 'Administrador',
        icon: '',
        handler: () => {
          this.confirmPermission(1, id);
        }
      }, {
        text: 'Usuario',
        icon: '',
        handler: () => {
          this.confirmPermission(0, id);
        }
      }]
    });
    await actionSheet.present();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.usersList = res.data;
    }, (err) => {
      console.log(err);
    });
  }

  getReloadUsers(event) {
    this.userService.getUsers().subscribe((res) => {
      this.usersList = res.data;
      event.target.complete();
    }, (err) => {
      console.log(err);
      event.target.complete();
    });
  }

  changePermission(pmsn: number, id: string) {
    this.userService.updatePermission(pmsn, id).subscribe((res) => {
      if (res.status) {
        const ind = this.usersList.findIndex(user => user._id === res.data._id);
        this.usersList[ind].permission = pmsn;
      }

    }, (err) => {
      console.log(err);
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe((res) => {
      if (res.status) {
        const ind = this.usersList.findIndex(user => user._id === res.data._id);
        this.usersList.splice(ind, 1);
      }
    }, (err) => {

    });
  }

}
