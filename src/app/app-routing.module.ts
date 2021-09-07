import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenaceServiceDetailPageComponent } from './maintenance/pages/maintenace-service-detail-page/maintenace-service-detail-page.component';
import { MaintenanceServicesPage } from './maintenance/pages/maintenance-services-page/maintenance-services-page.component';

const routes: Routes = [{
  path:'',
  pathMatch: 'full',
  redirectTo:'truck-maintenance'
},{
  path:'truck-maintenance',
  component: MaintenanceServicesPage
},{
  path:'truck-maintenance/add',
  component: MaintenaceServiceDetailPageComponent
},{
  path:'truck-maintenance/edit/:id',
  component: MaintenaceServiceDetailPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
