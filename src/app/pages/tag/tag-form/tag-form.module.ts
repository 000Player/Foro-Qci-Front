import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagFormPageRoutingModule } from './tag-form-routing.module';

import { TagFormPage } from './tag-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagFormPageRoutingModule
  ],
  declarations: [TagFormPage]
})
export class TagFormPageModule {}
