import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListLocationHazardComponent } from './list-location-hazard/list-location-hazard.component';

const routes: Routes = [
  {
    path: '',
    //component: ListEmergenciesComponent,
    children: [
      {
        path: '',
        component: ListLocationHazardComponent,
      },
      /*{
        path: 'create-permission-group',
        component: AddPermissionGroupComponent
      },
      {
        path: 'details-permission-group/:id',
        component: DetailsPermissionGroupComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationHazardRoutingModule { }
