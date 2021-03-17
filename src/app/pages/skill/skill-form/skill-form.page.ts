import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/models/branch';
import { Check } from 'src/app/models/check';
import { BranchService } from 'src/app/services/branch.service';
import { SkillsService } from 'src/app/services/skills.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.page.html',
  styleUrls: ['./skill-form.page.scss'],
})
export class SkillFormPage implements OnInit {

  branchList: Branch[] = new Array<Branch>();
  checkList: Check[] = new Array<Check>();
  userId: string;
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

  getBranches() {
    this.branchService.getBranches().subscribe((res) => {
      if (res.status) {
        this.branchList = res.data;
        this.fillList();
      } else {
        this.navigateAlert('¡ERROR AL OBTENER INFORMACION', 'Hubo un problema al intentar obtener informacion del servidor', 'OK',
         'profile');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'profile');
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
  }

  createSkill() {
    const skill = new Skill();
    skill.user._id = this.userId;

    for (const check of this.checkList) {
      if (check.isCheck) {
        const branch = new Branch();
        branch._id = check.id;
        skill.skills.push(branch);
      }
    }

    this.skillService.createSkill(skill).subscribe((res) => {
      if (res.status) {
        this.navigateAlert('¡REGISTRO EXITOSO!', 'Puedes editar tus datos en tu perfil', 'OK', 'profile');
        //Set local storage
      } else {
        this.navigateAlert('¡ERROR AL AGREGAR LOS SKILLS!', 'Hubo un problema al intentar crear este skill', 'OK', 'profile');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'profile');
    });
  }

  skip() {
    const skill = new Skill();
    skill.user._id = this.userId;

    this.skillService.createSkill(skill).subscribe((res) => {
      if (res.status) {
        this.navigateAlert('¡REGISTRO EXITOSO!', 'Puedes agregar tus habilidades mas tarde en tu perfil.', 'OK', 'profile');
      } else {
        this.navigateAlert('¡ERROR AL AGREGAR LOS SKILLS!', 'Hubo un problema al intentar crear este skill', 'OK', 'profile');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'profile');
    });
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
