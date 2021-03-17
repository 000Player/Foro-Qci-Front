import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/services/branch.service';
import { Branch } from 'src/app/models/branch';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { NavigationEnd, Router } from '@angular/router';
import { Util } from 'src/app/models/util';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  selectText: string;
  branchList: Branch[] = new Array<Branch>();
  tagsList: Tag[] = new Array<Tag>();
  tagsFilterList: Tag[] = new Array<Tag>();
  showMsg = false;
  userId: string;

  constructor(private branchService: BranchService, private tagService: TagService, private router: Router,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.selectText = 'Elige una opcion';
    this.userId = Util.getStorageUser()._id;
    this.getBranches();
    this.getTags();
  }

  getBranches() {
    this.branchService.getBranches().subscribe((res) => {
      if (res.status) {
        this.branchList = res.data;
      }
    }, (err) => {
      console.log(err);
    });
  }

  getReloadTags(event) {
    this.tagService.getTags().subscribe((res) => {
      if (res.status) {
        this.tagsList = res.data.filter(tag => tag.question.open === true);
        this.tagsFilterList = this.tagsList.reverse();
      }
      event.target.complete();

    }, (err) => {
      console.log(err);
      event.target.complete();
    });
  }

  async getTags() {
    const loading = await this.loadingController.create({
      message: 'Porfavor espere...',
    });

    await loading.present();

    this.tagService.getTags().subscribe(async (res) => {
      if (res.status) {
        this.tagsList = res.data.filter(tag => tag.question.open === true);
        this.tagsFilterList = this.tagsList.reverse();
      }
      await loading.dismiss();
    }, async (err) => {
      console.log(err);
      await loading.dismiss();
    });
  }

  filter() {
    if (this.selectText === 'TODO') {
      this.tagsFilterList = this.tagsList;
    } else if (this.selectText === 'MIS HABILIDADES') {
      const skill = Util.getStorageSkills();

      this.tagsFilterList = this.tagsList.filter(tag => {
        if (tag.question.user._id !== this.userId) {
          for (const branch of tag.tags) {
            const exist = skill.skills.findIndex(sk => sk._id === branch._id);
            if (exist !== -1) {
              return tag;
            }
          }
        }
      });
    } else {
      this.tagsFilterList = this.tagsList.filter(tag => {
        for (const branch of tag.tags) {
          if (branch.name === this.selectText) {
            return tag;
          }
        }
      });
    }
  }

  viewQuestion(id: string) {
    this.router.navigate(['/question-view/' + id]);
  }

  showMessage() {
    this.showMsg = !this.showMsg;
  }

  findQuestion(quest: string) {
    quest = quest.trim();
    const regExp = new RegExp(quest, 'i');
    this.tagsFilterList = [];

    for (const tag of this.tagsList) {
      if (tag.question.title.match(regExp)) {
        this.tagsFilterList.push(tag);
      }
    }
  }

}
