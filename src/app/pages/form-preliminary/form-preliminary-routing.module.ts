import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearInformacionGeneralComponent } from './crear-informacion-general/crear-informacion-general.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create/:idEmergencia',
        component: CreateComponent
      },
      {
        path: 'create-information/:idPreliminar/:idEmergencia',
        component: CrearInformacionGeneralComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormPreliminaryRoutingModule { }
