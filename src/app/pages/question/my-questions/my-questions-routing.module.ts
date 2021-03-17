import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyQuestionsPage } from './my-questions.page';

const routes: Routes = [
  {
    path: '',
    component: MyQuestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyQuestionsPageRoutingModule {}
