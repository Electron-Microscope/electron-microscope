import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessExplorerComponent } from './process-explorer.component';
import { Angular2DataTableModule } from 'angular2-data-table';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    Angular2DataTableModule,
    MaterialModule
  ],
  declarations: [
    ProcessExplorerComponent
  ],
  exports: [
    ProcessExplorerComponent
  ]
})
export class ProcessExplorerModule { }
