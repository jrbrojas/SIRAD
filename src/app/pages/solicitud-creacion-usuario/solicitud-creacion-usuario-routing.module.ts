import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsSolicitudCreacionUsuarioComponent } from './details-solicitud-creacion-usuario/details-solicitud-creacion-usuario.component';
import { ListSolicitudCreacionUsuarioComponent } from './list-solicitud-creacion-usuario/list-solicitud-creacion-usuario.component';
import { AddSolicitudCreacionUsuarioComponent } from './add-solicitud-creacion-usuario/add-solicitud-creacion-usuario.component';

const routes: Routes = [
  {
    path: '',
    //component: ListSolicitudCreacionUsuarioComponent,
    children: [
      {
        path: '',
        component: ListSolicitudCreacionUsuarioComponent
      },
      {
        path: 'create-solicitud-creacion-usuario',
        component: AddSolicitudCreacionUsuarioComponent
      },
      {
        path: 'details-solicitud-creacion-usuario/:id',
        component: DetailsSolicitudCreacionUsuarioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudCreacionUsuarioRoutingModule { }
