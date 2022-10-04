import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListPermissionComponent } from './list-permission/list-permission.component';
import { AddPermissionComponent } from './add-permission/add-permission.component';
import { DetailsPermissionComponent } from './details-permission/details-permission.component';

const routes: Routes = [
  {
    path: '',
    //component: ListEmergenciesComponent,
    children: [
      {
        path: '',
        component: ListPermissionComponent,
      },
      {
        path: 'create-permission',
        component: AddPermissionComponent
      },
      {
        path: 'details-permission/:id',
        component: DetailsPermissionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
