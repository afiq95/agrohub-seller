import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VarietieslistPage } from './varietieslist.page';

const routes: Routes = [
  {
    path: '',
    component: VarietieslistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VarietieslistPage]
})
export class VarietieslistPageModule {}
