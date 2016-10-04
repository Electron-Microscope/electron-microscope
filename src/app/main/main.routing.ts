import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProcessExplorerComponent } from './process-explorer/process-explorer.component';
import { DiskExplorerComponent } from './disk-explorer/disk-explorer.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'process-explorer', component: ProcessExplorerComponent },
  { path: 'disk-explorer', component: DiskExplorerComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
