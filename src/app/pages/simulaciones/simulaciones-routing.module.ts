import { SolicitudCredencialesComponent } from './solicitud-credenciales/solicitud-credenciales.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { SimulacionesListComponent } from './simulaciones-list/simulaciones-list.component';
import { SimulacionesDetailsComponent } from './simulaciones-details/simulaciones-details.component';
import { SimulacionesSeguimientoReportesComponent } from './simulaciones-seguimiento-reportes/simulaciones-seguimiento-reportes.component';
import { SeguridadUsuariosComponent } from './seguridad-usuarios/seguridad-usuarios.component';
import { SeguridadPerfilesComponent } from './seguridad-perfiles/seguridad-perfiles.component';
import { SeguridadPermisosComponent } from './seguridad-permisos/seguridad-permisos.component';
import { SeguridadUsuariosAddComponent } from './seguridad-usuarios-add/seguridad-usuarios-add.component';
import { SeguridadPermisosAddComponent } from './seguridad-permisos-add/seguridad-permisos-add.component';
import { SeguridadUsuariosSolicitudComponent } from './seguridad-usuarios-solicitud/seguridad-usuarios-solicitud.component';
import { SeguridadUsuariosSolicitudAddComponent } from './seguridad-usuarios-solicitud-add/seguridad-usuarios-solicitud-add.component';
import { SeguridadPerfilesAddComponent } from './seguridad-perfiles-add/seguridad-perfiles-add.component';
import { SimulacionesFichaEvaluacionComponent } from './simulaciones-ficha-evaluacion/simulaciones-ficha-evaluacion.component';
import { SimulacionesFichaEvaluacionDetalleComponent } from './simulaciones-ficha-evaluacion-detalle/simulaciones-ficha-evaluacion-detalle.component';

const routes: Routes = [
  {
    path: '',
    //component: ListEmergenciesComponent,
    children: [
      {
        path: '',
        component: SimulacionesListComponent,
      },
      {
        path: 'details',
        component: SimulacionesDetailsComponent
      },
      {
        path: 'solicitud-credenciales',
        component: SolicitudCredencialesComponent
      },
      {
        path: 'seguimiento-reportes',
        component: SimulacionesSeguimientoReportesComponent
      },
      {
        path: 'seguridad/usuarios',
        component: SeguridadUsuariosComponent
      },
      {
        path: 'seguridad/usuarios-add',
        component: SeguridadUsuariosAddComponent
      },
      {
        path: 'seguridad/usuarios-solicitud',
        component: SeguridadUsuariosSolicitudComponent
      },
      {
        path: 'seguridad/usuarios-solicitud-add',
        component: SeguridadUsuariosSolicitudAddComponent
      },
      {
        path: 'seguridad/perfiles',
        component: SeguridadPerfilesComponent
      },
      {
        path: 'seguridad/perfiles-add',
        component: SeguridadPerfilesAddComponent
      },
      {
        path: 'seguridad/permisos',
        component: SeguridadPermisosComponent
      },

      {
        path: 'seguridad/permisos-add',
        component: SeguridadPermisosAddComponent
      },
      {
        path: 'ficha-evaluacion',
        component: SimulacionesFichaEvaluacionComponent
      },
      
      {
        path: 'ficha-evaluacion-detalle',
        component: SimulacionesFichaEvaluacionDetalleComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
