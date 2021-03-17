import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Util } from 'src/app/models/util';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.page.html',
  styleUrls: ['./event-form.page.scss'],
})
export class EventFormPage implements OnInit {

  today = new Date().toISOString();
  maxD = new Date(2100, 1, 1).toISOString();
  id: string;
  event: Event = new Event();

  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService,
    private router: Router, private alertController: AlertController, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.event.dateStart = new Date();
    this.id = this.activatedRoute.snapshot.params.id;
    this.getEvent(this.id);
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

  getEvent(id: string) {
    if (id !== '0') {
      this.eventService.getEventById(id).subscribe((res) => {
        if (res.status) {
          this.event = res.data;
        } else {
          this.navigateAlert('¡ERROR AL OBTENER!', 'Hubo un problema al intentar obtener la informacion de este evento', 'OK', 'events');
        }
      }, (err) => {
        this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'events');
      });
    } else {
      this.event = new Event();
    }
  }

  async createEvent() {
    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
    });

    await loading.present();

    this.event.dateStart = new Date();
    this.event.user._id = Util.getStorageUser()._id;
    this.event.open = true;

    this.eventService.createEvent(this.event).subscribe(async (res) => {

      if (res.status) {
        this.navigateAlert('¡EVENTO CREADO!', 'Creaste un nuevo evento', 'OK', 'events');
        await loading.dismiss();
      } else {
        this.navigateAlert('¡ERROR AL CREAR!', 'Hubo un problema al intentar crear el evento', 'OK', 'events');
        await loading.dismiss();
      }
    }, async (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'events');
      await loading.dismiss();
    });
  }

  async updateEvent() {
    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
    });

    await loading.present();

    this.eventService.updateEvent(this.event).subscribe(async (res) => {
      if (res.status) {
        this.navigateAlert('¡EVENTO MODIFICADO!', 'Modificaste este evento', 'OK', 'events');
        await loading.dismiss();
      } else {
        this.navigateAlert('¡ERROR AL MODIFICAR!', 'Hubo un problema al modificar este evento', 'OK', 'events');
        await loading.dismiss();
      }
    }, async (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'events');
      await loading.dismiss();
    });

  }
}
