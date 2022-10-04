import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPeligrosSecundariosComponent } from './list-peligros-secundarios/list-peligros-secundarios.component';
import { AddPeligrosSecundariosComponent } from './add-peligros-secundarios/add-peligros-secundarios.component';
import { DetailsPeligrosSecundariosComponent } from './details-peligros-secundarios/details-peligros-secundarios.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListPeligrosSecundariosComponent
      },
      {
        path: 'create-peligros-secundarios',
        component: AddPeligrosSecundariosComponent
      },
      {
        path: 'details-peligros-secundarios/:id',
        component: DetailsPeligrosSecundariosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeligrosSecundariosRoutingModule { }
