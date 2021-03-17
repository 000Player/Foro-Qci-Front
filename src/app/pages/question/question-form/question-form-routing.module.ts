import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionFormPage } from './question-form.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionFormPageRoutingModule {}
