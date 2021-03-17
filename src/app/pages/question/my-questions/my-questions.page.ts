import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Util } from 'src/app/models/util';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.page.html',
  styleUrls: ['./my-questions.page.scss'],
})
export class MyQuestionsPage implements OnInit {

  user = new User();
  myQuestions: Question[] = new Array<Question>();

  constructor(private questionService: QuestionService, private router: Router,
              private alertController: AlertController, private toastController: ToastController,
              public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = Util.getStorageUser();
    this.getQuestions();
  }

  async toast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  async getQuestions() {
    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
    });

    await loading.present();

    this.questionService.getQuestionByUserId(this.user._id).subscribe((res) => {
      this.myQuestions = res.data.reverse();
      loading.dismiss();

    }, (err) => {
      console.log(err);
      loading.dismiss();
    });
  }

  viewQuestion(id: string) {
    this.router.navigate(['/question-view/' + id]);
  }

  newQuestion() {
    this.router.navigate(['/question-form/' + 0]);
  }

  updateQuestion(id: string) {
    this.router.navigate(['/question-form/' + id]);
  }

  closeQuestion(id: string) {
    this.questionService.closeQuestion(id).subscribe((res) => {

      const ind = this.myQuestions.findIndex(quest => quest._id === res.data._id);
      this.myQuestions[ind].open = false;
      this.toast('La pregunta se ha cerrado');

    }, (err) => {
      this.toast('No se pudo cerrar la pregunta, revise su conexión');
    });
  }

  async confirmClose(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡CONFIRMAR!',
      message: '¿Esta seguro que desea cerrar esta pregunta? Nadie mas podra contestarla.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Si',
          cssClass: 'success',
          handler: () => {
            this.closeQuestion(id);
          }
        }
      ]
    });

    await alert.present();
  }

}
