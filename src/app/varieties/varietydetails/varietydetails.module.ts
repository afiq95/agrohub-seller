import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VarietydetailsPage } from './varietydetails.page';

const routes: Routes = [
  {
    path: '',
    component: VarietydetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VarietydetailsPage]
})
export class VarietydetailsPageModule {}
