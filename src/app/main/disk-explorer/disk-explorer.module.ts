import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiskExplorerComponent } from './disk-explorer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DiskExplorerComponent
  ],
  exports: [
    DiskExplorerComponent
  ]
})
export class DiskExplorerModule { }
