import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchFormPageRoutingModule } from './branch-form-routing.module';

import { BranchFormPage } from './branch-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BranchFormPageRoutingModule
  ],
  declarations: [BranchFormPage]
})
export class BranchFormPageModule {}
