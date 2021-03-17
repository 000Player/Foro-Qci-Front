import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Branch } from 'src/app/models/branch';
import { User } from 'src/app/models/user';
import { Util } from 'src/app/models/util';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.page.html',
  styleUrls: ['./branches.page.scss'],
})
export class BranchesPage implements OnInit {

  user = new User();
  branchList = new Array<Branch>();

  constructor(private branchService: BranchService,
    private alertController: AlertController,
    private router: Router,  public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = Util.getStorageUser();
    this.getBranches();
  }

  async getBranches() {
    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
    });

    await loading.present();

    this.branchService.getBranches().subscribe(async (res) => {
      if (res.status) {
        this.branchList = res.data;
      }
      await loading.dismiss();
    }, async (err) => {
      console.log(err);
      await loading.dismiss();
    });
  }

  getReloadBranches(event) {
    this.branchService.getBranches().subscribe((res) => {
      if (res.status) {
        this.branchList = res.data;
        event.target.complete();
      }
    }, (err) => {
      console.log(err);
      event.target.complete();
    });
  }

  deleteBranch(id: string) {
    this.branchService.deleteBranch(id).subscribe((res) => {
      if (res.status) {
        const ind = this.branchList.findIndex(branch => branch._id === res.data._id);
        this.branchList.splice(ind, 1);
      }
    }, (err) => {
      console.log(err);
    });
  }

  editBranch(id: string) {
    this.router.navigate(['/branch-form/' + id]);
  }

  async confirmClose(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡CONFIRMAR!',
      message: '¿Esta seguro que desea eliminar esta rama, ya no se podra recuperar.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Si',
          cssClass: 'success',
          handler: () => {
            this.deleteBranch(id);
          }
        }
      ]
    });
    await alert.present();
  }

}
