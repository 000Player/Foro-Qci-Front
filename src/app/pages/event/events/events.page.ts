import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Util } from 'src/app/models/util';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  user = new User();
  loading: any;

  constructor(public eventService: EventService, private router: Router, private alertController: AlertController,
              private toastController: ToastController, public loadingController: LoadingController) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = Util.getStorageUser();
    this.getEvents();
  }

  async toast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  async confirmClose(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡CONFIRMAR!',
      message: '¿Esta seguro que desea cerrar este evento?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Si',
          cssClass: 'success',
          handler: () => {
            this.closeEvent(id);
          }
        }
      ]
    });
    await alert.present();
  }

  async getEvents() {
    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
    });

    await loading.present();

    this.eventService.getEvents().subscribe(async (res) => {
      this.eventService.eventList = res.data;
      await loading.dismiss();
    }, async (err) => {
      this.toast('Problema al conectar la servidor.');
      await loading.dismiss();
    });
  }

  getReloadEvents(event) {
    this.eventService.getEvents().subscribe((res) => {
      this.eventService.eventList = res.data;
      event.target.complete();
    }, (err) => {
      this.toast('Problema al conectar la servidor.');
      event.target.complete();
    });
  }

  editEvent(id: string) {
    this.router.navigate(['/event-form/' + id]);
  }

  async closeEvent(id: string) {
    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
    });

    await loading.present();

    this.eventService.closeEvent(id).subscribe(async (res) => {
      const ind = this.eventService.eventList.findIndex(event => event._id === id);
      this.eventService.eventList.splice(ind, 1);
      this.toast('El evento se ha cerrado.');
      await loading.dismiss();

    }, async (err) => {
      this.toast('No se pudo cerrar el evento, revise su conexión.');
      await loading.dismiss();

    });
  }

  mostrarOcultar() {
    if (document.getElementById('mostrarOcultar').style.display === 'none') {
      document.getElementById('mostrarOcultar').style.display = 'block';
    }
    else if (document.getElementById('mostrarOcultar').style.display === 'block') {
      document.getElementById('mostrarOcultar').style.display = 'none';
    }
  }

}
