import { VisualizacionComponent } from './visualizacion/visualizacion/visualizacion.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { RecursosAddComponent } from './registro/registro/recursos-add/recursos-add.component';
import { RecursosComponent } from './registro/registro/recursos/recursos.component';
import { RegistroComponent } from './registro/registro/registro.component';
import { UsuariosDetailsComponent } from './seguridad/seguridad/usuarios-details/usuarios-details.component';
import { UsuariosListComponent } from './seguridad/seguridad/usuarios-list/usuarios-list.component';

const routes: Routes = [
  {
    path: '',
    //component: ListEmergenciesComponent,
    children: [
      {
        path: 'registro',
        component: RegistroComponent,
      },
      {
        path: 'seguridad/usuarios',
        component: UsuariosListComponent,
      },
      {
        path: 'seguridad/usuarios-add',
        component: UsuariosDetailsComponent,
      },
      {
        path: 'registro/recursos',
        component: RecursosComponent,
      },
      {
        path: 'registro/recursos-add',
        component: RecursosAddComponent,
      },
      {
        path:'visualizacion/mapa',
        component: VisualizacionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
