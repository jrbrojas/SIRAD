
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { CategoriesComponent } from './registro/categories/categories.component';
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
