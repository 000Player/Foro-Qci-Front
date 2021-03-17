import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkillUpdatePageRoutingModule } from './skill-update-routing.module';

import { SkillUpdatePage } from './skill-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkillUpdatePageRoutingModule
  ],
  declarations: [SkillUpdatePage]
})
export class SkillUpdatePageModule {}
