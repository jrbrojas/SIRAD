import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDangerComponent } from './list-danger/list-danger.component';
import { AddDangerComponent } from './add-danger/add-danger.component';
import { DetailsDangerComponent } from './details-danger/details-danger.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListDangerComponent
      },
      {
        path: 'create-danger',
        component: AddDangerComponent
      },
      {
        path: 'details-danger/:id',
        component: DetailsDangerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DangerRoutingModule { }
