import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListPermissionGroupComponent } from './list-permission-group/list-permission-group.component';
import { DetailsPermissionGroupComponent } from './details-permission-group/details-permission-group.component';
import { AddPermissionGroupComponent } from './add-permission-group/add-permission-group.component';

const routes: Routes = [
  {
    path: '',
    //component: ListEmergenciesComponent,
    children: [
      {
        path: '',
        component: ListPermissionGroupComponent,
      },
      {
        path: 'create-permission-group',
        component: AddPermissionGroupComponent
      },
      {
        path: 'details-permission-group/:id',
        component: DetailsPermissionGroupComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoPermisoRoutingModule { }
