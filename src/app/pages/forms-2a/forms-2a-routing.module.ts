import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddForm2AComponent } from './add/add.component';
import { DetailsForm2AComponent } from './details/details.component';
import { NewComponent } from './new/new.component';
import {NewEditComponent} from "./new-edit/new-edit.component";
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { PERMISOS } from 'src/app/shared/models/permisos';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'details/:id',
        component: DetailsForm2AComponent
      },
      {
        path: 'create/:idEmergency/:idEmp',
        component: AddForm2AComponent,
        /*canActivate: [AuthGuard],
        data: {permisos: [PERMISOS.CREAR_EMERGENCIAS]}*/
      },
      {
        path: 'new/:idEmergencia/:idFormulario',
        component: NewComponent
      },
      {
        path: 'new-edit/:id',
        component: NewEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Forms2aRoutingModule { }
