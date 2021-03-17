import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ToastController } from '@ionic/angular';
import { SkillsService } from 'src/app/services/skills.service';
import { Skill } from 'src/app/models/skill';
import { Router } from '@angular/router';
import { Util } from 'src/app/models/util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = new User();
  skill = new Skill();

  constructor(private userService: UserService, private toastController: ToastController,
    private skillService: SkillsService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = Util.getStorageUser();
    this.getSkill();
  }

  async toastMessage(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe((res) => {
      if (res.status) {
        this.user = res.data;
        Util.setStorageUser(this.user);
        this.toastMessage('Se actualizo la informacion del usuario');
      } else {
        this.toastMessage('Hubo un problema al actualizar la infomacion del usuario');
      }
    }, (err) => {
      this.toastMessage('Problema al conectar con el servidor.');
    });
  }

  getSkill() {
    this.skillService.getSkill(this.user._id).subscribe((res) => {
      if (res.status) {
        this.skill = res.data;
      } else {
        this.toastMessage('Hubo un problema al obtener la infomación del usuario');
      }
    }, (err) => {
      this.toastMessage('Problema al conectar con el servidor.');
    });
  }

  editSkills() {
    this.router.navigate(['/skill-update/' + this.user._id]);
  }

  enableInput(input: HTMLInputElement) {
    input.readOnly = false;
    input.style.color = 'rgb(20, 54, 119)';
  }


}
