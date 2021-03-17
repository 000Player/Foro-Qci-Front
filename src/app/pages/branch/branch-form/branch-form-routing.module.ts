import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchFormPage } from './branch-form.page';

const routes: Routes = [
  {
    path: '',
    component: BranchFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchFormPageRoutingModule {}
