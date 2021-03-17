import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Branch } from 'src/app/models/branch';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.page.html',
  styleUrls: ['./branch-form.page.scss'],
})
export class BranchFormPage implements OnInit {

  id: string;
  branch = new Branch();
  constructor(private activatedRoute: ActivatedRoute, private branchService: BranchService,
    private alertController: AlertController, private router: Router, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getBranch(this.id);
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

  getBranch(id: string) {
    if (id !== '0') {
      this.branchService.getBranchById(id).subscribe((res) => {
        if (res.status) {
          this.branch = res.data;
        } else {
          this.navigateAlert('¡ERROR AL OBTENER!', 'Hubo un problema al intentar obtener la informacion de esta rama', 'OK', 'branches');
        }
      }, (err) => {
        this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'branches');
      });
    } else {
      this.branch = new Branch();
    }
  }

  async createBranch() {

    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
    });

    await loading.present();

    this.branchService.createBranch(this.branch).subscribe(async (res) => {
      if (res.status) {
        this.navigateAlert('RAMA CREADA!', 'Creaste una nueva rama', 'OK', 'branches');
      } else {
        this.navigateAlert('¡ERROR AL CREAR!', 'Hubo un problema al intentar crear la rama', 'OK', 'branches');
      }
      await loading.dismiss();
    }, async (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'events');
      await loading.dismiss();
    });
  }

  async updateBranch() {

    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
    });

    await loading.present();
    this.branchService.updateBranch(this.branch).subscribe(async (res) => {
      if (res.status) {
        this.navigateAlert('!RAMA MODIFICADA!', 'Modificaste esta rama', 'OK', 'branches');
      } else {
        this.navigateAlert('¡ERROR AL MODIFICAR!', 'Hubo un problema al modificar esta rama', 'OK', 'branch');
      }
      await loading.dismiss();

    }, async (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'branch');
      await loading.dismiss();
    });
  }

}
