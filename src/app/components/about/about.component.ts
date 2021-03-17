import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  counter = 0;
  url = 'assets/icon/nodeapp.png';
  text = 'fue hecho con NodeJs para el lado del backend';
  head = 'NodeJs';
  constructor(public toastController: ToastController) { }

  ngOnInit() { }

  async presentToast() {
    const toast = await this.toastController.create({
      header: 'MUCHAS GRACIAS POR VISITAR FORO QCI',
      message: 'Recuerda que el foro lo hacemos entre todos',
      position: 'bottom',
      duration: 5000
    });
    toast.present();
  }

  secret() {
    this.counter++;
    if (this.counter === 20) {
      this.presentToast();
      this.url = 'assets/icon/logoudg.png';
      this.head = 'CUCEI - Centro Universitario de Ciencias Exactas e Ingeniería';
      this.text = 'te da las gracias por tu apoyo.';
      this.counter = 0;
    }
  }

}
