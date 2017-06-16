import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessExplorerComponent } from './process-explorer.component';
import { MdButtonModule, MdCardModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    MdCardModule,
    MdButtonModule,
  ],
  declarations: [
    ProcessExplorerComponent
  ],
  exports: [
    ProcessExplorerComponent
  ]
})
export class ProcessExplorerModule { }
