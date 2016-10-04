import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessExplorerComponent } from './process-explorer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProcessExplorerComponent
  ],
  exports: [
    ProcessExplorerComponent
  ]
})
export class ProcessExplorerModule { }
