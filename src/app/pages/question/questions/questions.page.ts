import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Router, NavigationEnd } from '@angular/router';
import { Question } from 'src/app/models/question';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  questionList: Question[] = new Array<Question>();
  questionFilterList: Question[] = new Array<Question>();
  constructor(private questionService: QuestionService, private router: Router,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getQuestions();
  }

  async getQuestions() {
    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
    });

    await loading.present();

    this.questionService.getQuestions().subscribe((res) => {
      if (res.status) {
        this.questionList = res.data.reverse();
        this.questionFilterList = this.questionList;
      }
      loading.dismiss();
    },
      (err) => {
        console.log(err);
        loading.dismiss();
      });
  }

  getReloadQns(event) {
    this.questionService.getQuestions().subscribe((res) => {
      if (res.status) {
        this.questionList = res.data.reverse();
        this.questionFilterList = this.questionList;
        event.target.complete();
      }
    },
      (err) => {
        event.target.complete();
        console.log(err);
      });
  }

  findQuestion(quest: string) {
    quest = quest.trim();
    const regExp = new RegExp(quest, 'i');
    this.questionFilterList = [];

    for (const qtn of this.questionList) {
      if (qtn.title.match(regExp)) {
        this.questionFilterList.push(qtn);
      }
    }
  }

  viewQuestion(id: string) {
    this.router.navigate(['/question-view/' + id]);
  }

  showHide() {
    if (document.getElementById('showHide').style.display === 'none') {
      document.getElementById('showHide').style.display = 'block';
    }
    else if (document.getElementById('showHide').style.display === 'block') {
      document.getElementById('showHide').style.display = 'none';
    }
  }

}
