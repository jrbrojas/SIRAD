import { VisualizacionComponent } from './visualizacion/visualizacion/visualizacion.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { RecursosAddComponent } from './registro/registro/recursos-add/recursos-add.component';
import { RecursosComponent } from './registro/registro/recursos/recursos.component';
import { CategoriesComponent } from './registro/categories/categories.component';
import { RegistroComponent } from './registro/registro/registro.component';
import { UsuariosDetailsComponent } from './seguridad/seguridad/usuarios-details/usuarios-details.component';
import { UsuariosListComponent } from './seguridad/seguridad/usuarios-list/usuarios-list.component';
import { CargaMasivaComponent } from './carga-masiva/carga-masiva.component';
import { PerfilListComponent } from './seguridad/seguridad/perfil-list/perfil-list.component';
import { PerfilAddComponent } from './seguridad/seguridad/perfil-add/perfil-add.component';
import { PermisosListComponent } from './seguridad/seguridad/permisos-list/permisos-list.component';
import { PermisosAddComponent } from './seguridad/seguridad/permisos-add/permisos-add.component';
import { PerfilEditComponent } from './seguridad/seguridad/perfil-edit/perfil-edit.component';
import { PermisosEditComponent } from './seguridad/seguridad/permisos-edit/permisos-edit.component';

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
        path: 'registro/categorias',
        component : CategoriesComponent

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
        path: 'seguridad/perfiles',
        component: PerfilListComponent,
      },
      {
        path: 'seguridad/perfiles-add',
        component: PerfilAddComponent,
      },
      {
        path: 'seguridad/perfiles-edit',
        component: PerfilEditComponent,
      },
      {
        path: 'seguridad/permisos',
        component: PermisosListComponent,
      },
      {
        path: 'seguridad/permisos-add',
        component: PermisosAddComponent,
      },
      {
        path: 'seguridad/permisos-edit',
        component: PermisosEditComponent,
      },
      {
        path: 'registro/recursos',
        component: RecursosComponent,
      },
      {
        path: 'registro/carga-masiva',
        component: CargaMasivaComponent,
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
