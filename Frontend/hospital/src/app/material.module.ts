import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

const materials = [
  CommonModule,
  MatTabsModule,
  MatButtonModule
];


@NgModule({
  imports: materials,
  exports: materials
})
export class MaterialModule { }
