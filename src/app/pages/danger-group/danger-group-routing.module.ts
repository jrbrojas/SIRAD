import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDangerGroupComponent } from './list-danger-group/list-danger-group.component';
import { AddDangerGroupComponent } from './add-danger-group/add-danger-group.component';
import { DetailsDangerGroupComponent } from './details-danger-group/details-danger-group.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListDangerGroupComponent
      },
      {
        path: 'create-danger-group',
        component: AddDangerGroupComponent
      },
      {
        path: 'details-danger-group/:id',
        component: DetailsDangerGroupComponent

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DangerGroupRoutingModule { }
