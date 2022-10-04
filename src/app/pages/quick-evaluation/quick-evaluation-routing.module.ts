import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListQuickEvaluationComponent } from "./list/list.component";
import {AddQuickEvaluationComponent} from "./add/add.component";
import {DetailsQuickEvaluationComponent} from "./details/details.component";
import {EditQuickEvaluationComponent} from "./edit/edit.component";
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { PERMISOS } from 'src/app/shared/models/permisos';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list/:id',
        component: ListQuickEvaluationComponent
      },
      {
        path: 'create/:id',
        component: AddQuickEvaluationComponent,
        canActivate: [AuthGuard],
        data: {permisos: [PERMISOS.CREAR_EVALUACION_RAPIDA]} 
      },
      {
        path: 'details/:id',
        component: DetailsQuickEvaluationComponent,
        canActivate: [AuthGuard],
        data: {permisos: [PERMISOS.EDITAR_EVALUACION_RAPIDA]} 
      },
      {
        path: 'edit/:id',
        component: EditQuickEvaluationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickEvaluationRoutingModule { }
