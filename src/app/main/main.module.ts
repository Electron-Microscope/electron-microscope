import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdSidenavModule, MdToolbarModule } from '@angular/material';
import { MainComponent } from './main.component';
import { ModulesNavComponent } from './modules-nav/modules-nav.component';
import { routing } from './main.routing';
import { DashboardModule } from './dashboard/dashboard.module';
import { DiskExplorerModule } from './disk-explorer/disk-explorer.module';
import { ProcessExplorerModule } from './process-explorer/process-explorer.module';
import { OverlayService } from './shared/overlay.service';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    routing,
    DashboardModule,
    DiskExplorerModule,
    ProcessExplorerModule
  ],
  declarations: [
    MainComponent,
    ModulesNavComponent
  ],
  exports: [
    MainComponent
  ],
  providers: [OverlayService]
})
export class MainModule { }
