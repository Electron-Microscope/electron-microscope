import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { MainComponent } from './main.component';
import { ModulesNavComponent } from './modules-nav/modules-nav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    MainComponent,
    ModulesNavComponent
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
