import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyQuestionsPageRoutingModule } from './my-questions-routing.module';

import { MyQuestionsPage } from './my-questions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyQuestionsPageRoutingModule
  ],
  declarations: [MyQuestionsPage]
})
export class MyQuestionsPageModule {}
