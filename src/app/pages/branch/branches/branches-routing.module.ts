import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchesPage } from './branches.page';

const routes: Routes = [
  {
    path: '',
    component: BranchesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchesPageRoutingModule {}
