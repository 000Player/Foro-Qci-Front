import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/services/branch.service';
import { Branch } from 'src/app/models/branch';
import { Check } from 'src/app/models/check';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { QuestionService } from 'src/app/services/question.service';
import { NlService } from 'src/app/services/nl.service';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.page.html',
  styleUrls: ['./tag-form.page.scss'],
})
export class TagFormPage implements OnInit {

  branchList: Branch[] = new Array<Branch>();
  checkList: Check[] = new Array<Check>();
  questionId: string;
  formValid: boolean;
  addWords: boolean;
  labels = [];

  constructor(private branchService: BranchService, private tagService: TagService,
    private activatedRoute: ActivatedRoute, private alertController: AlertController,
    private router: Router, private questionService: QuestionService, private nlService: NlService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.questionId = this.activatedRoute.snapshot.params.id;
    this.labels = (this.activatedRoute.snapshot.queryParams.labels)
      ? this.activatedRoute.snapshot.queryParams.labels
      : [];
    this.getBranches();
    this.formValid = false;
    this.addWords = false;
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
        this.navigateAlert('¡ERROR AL OBTENER INFORMACION', 'Hubo un problema al intentar obtener informacion del servidor', 'OK', 'my-questions');
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
    this.fillCheckList();
  }

  fillCheckList() {
    this.addWords = (this.labels.length > 0) ? false : true;

    let ind: number;
    for (let lbl of this.labels) {
      ind = this.checkList.findIndex(check => check.id === lbl);
      this.checkList[ind].isCheck = true;
    }
    this.validateForm();
  }

  createTag() {
    const tag = new Tag();
    tag.question._id = this.questionId;

    for (const check of this.checkList) {
      if (check.isCheck) {
        const branch = new Branch();
        branch._id = check.id;
        tag.tags.push(branch);
      }
    }

    if (this.addWords) {
      this.addNewWords(this.checkList);
    }

    this.tagService.createTag(tag).subscribe((res) => {
      if (res.status) {
        this.navigateAlert('¡PREGUNTA ENVIADA!', 'Creaste una nueva pregunta', 'OK', 'my-questions');
      } else {
        this.navigateAlert('¡ERROR AL AGREGAR LOS TAGS!', 'Hubo un problema al intentar crear este tag', 'OK', 'my-questions');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'my-questions');
    });
  }

  addNewWords(tags) {
    const brchs = new Array<string>();

    for (const check of this.checkList) {
      const exists = this.labels.findIndex(br => br === check.id);
      if (check.isCheck && exists === -1) {
        brchs.push(check.name);
      }
    }

    this.questionService.getQuestionById(this.questionId).subscribe((res) => {
      if (res.status) {
        const words = res.data.title;
        this.nlService.addNewWords(words, brchs).subscribe((res) => { }, (err) => {
          console.log(err);
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  validateForm() {
    for (const check of this.checkList) {
      const exists = this.labels.findIndex(br => br === check.id);

      if (check.isCheck && exists === -1) {
        this.addWords = true;
        break;
      }
      this.addWords = false;
    }

    for (const check of this.checkList) {

      if (check.isCheck) {
        this.formValid = true;
        return;
      }
    }
    this.formValid = false;
    this.addWords = false;
  }


}
