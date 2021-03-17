import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillUpdatePage } from './skill-update.page';

const routes: Routes = [
  {
    path: '',
    component: SkillUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillUpdatePageRoutingModule {}
