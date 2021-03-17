import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/models/branch';
import { Check } from 'src/app/models/check';
import { BranchService } from 'src/app/services/branch.service';
import { SkillsService } from 'src/app/services/skills.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { Util } from 'src/app/models/util';

@Component({
  selector: 'app-skill-update',
  templateUrl: './skill-update.page.html',
  styleUrls: ['./skill-update.page.scss'],
})
export class SkillUpdatePage implements OnInit {

  branchList: Branch[] = new Array<Branch>();
  checkList: Check[] = new Array<Check>();
  userId: string;
  userSkill = new Skill();
  formValid: boolean;

  constructor(private branchService: BranchService, private skillService: SkillsService,
    private activatedRoute: ActivatedRoute, private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userId = this.activatedRoute.snapshot.params.id;
    this.getBranches();
    this.formValid = false;
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

  updateSkill() {
    this.userSkill.skills = new Array<Branch>();

    for (const check of this.checkList) {
      if (check.isCheck) {
        const branch = new Branch();
        branch._id = check.id;
        this.userSkill.skills.push(branch);
      }
    }

    this.skillService.updateSkill(this.userSkill).subscribe((res) => {
      if (res.status) {
        Util.setStorageSkill(res.data);
        this.router.navigate(['/profile']);
      } else {
        this.navigateAlert('¡ERROR AL OBTENER INFORMACION', 'Hubo un problema al intentar obtener informacion del servidor', 'OK'
          , 'profile');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'my-questions');
    });
  }

  getBranches() {
    this.branchService.getBranches().subscribe((res) => {
      if (res.status) {
        this.branchList = res.data;
        this.getSkill();
      } else {
        this.navigateAlert('¡ERROR AL OBTENER INFORMACION', 'Hubo un problema al intentar obtener informacion del servidor', 'OK'
          , 'profile');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'my-questions');
    });
  }

  getSkill() {
    this.skillService.getSkill(this.userId).subscribe((res) => {
      if (res.status) {
        this.userSkill = res.data;
        this.fillList();
      } else {
        this.navigateAlert('¡ERROR AL OBTENER INFORMACION', 'Hubo un problema al intentar obtener informacion del servidor', 'OK'
          , 'profile');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'my-questions');
    });
  }

  fillList() {
    for (const branch of this.branchList) {
      const check = new Check();
      check.id = branch._id;
      check.name = branch.name;
      check.isCheck = false;

      this.checkList.push(check);
    }

    for (const check of this.checkList) {
      if (this.userSkill.skills.find(branch => check.name === branch.name)) {
        check.isCheck = true;
      }
    }
  }

  validateForm() {
    for (const check of this.checkList) {
      if (check.isCheck) {
        this.formValid = true;
        return;
      }
    }
    this.formValid = false;
  }

}
