import { Routes } from '@angular/router';

export const routeContent: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../../pages/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'project',
    loadChildren: () => import('../../pages/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'to-do',
    loadChildren: () => import('../../pages/todo/todo.module').then(m => m.TodoModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('../../pages/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: 'emergencias',
    loadChildren: () => import('../../pages/emergencies/emergencies.module').then(m => m.EmergenciesModule)
  },
  {
    path: 'form-2a',
    loadChildren: () => import('../../pages/forms-2a/forms-2a.module').then(m => m.Forms2aModule)
  },
  {
    path: 'quick-evaluation',
    loadChildren: () => import('../../pages/quick-evaluation/quick-evaluation.module').then(m => m.QuickEvaluationModule)
  },
  {
    path: 'seguridad/grupo-permisos',
    loadChildren: () => import('../../pages/grupo-permiso/grupo-permiso.module').then(m => m.GrupoPermisoModule)
  },
  {
    path: 'seguridad/permisos',
    loadChildren: () => import('../../pages/permission/permission.module').then(m => m.PermissionModule)
  },
  {
    path: 'seguridad/perfiles',
    loadChildren: () => import('../../pages/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'seguridad/usuarios',
    loadChildren: () => import('../../pages/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'administracion/peligro-ubicacion',
    loadChildren: () => import('../../pages/location-hazard/location-hazard.module').then(m => m.LocationHazardModule)
  },
  {
    path: 'administracion/peligro',
    loadChildren: () => import('../../pages/danger/danger.module').then(m => m.DangerModule)
  },
  {
    path: 'administracion/grupo-peligro',
    loadChildren: () => import('../../pages/danger-group/danger-group.module').then(m => m.DangerGroupModule)
  },
  {
    path: 'administracion/peligros-secundarios',
    loadChildren: () => import('../../pages/peligros-secundarios/peligros-secundarios.module').then(m => m.PeligrosSecundariosModule)
  },
  {
    path: 'form-preliminary',
    loadChildren: () => import('../../pages/form-preliminary/form-preliminary.module').then(m => m.FormPreliminaryModule)
  },
  {
    path: 'seguridad/solicitud-creacion-credenciales',
    loadChildren: () => import('../../pages/solicitud-creacion-usuario/solicitud-creacion-usuario.module').then(m => m.SolicitudCreacionUsuarioModule)
  }
  ,
  {
    path: 'reportes/reportes-general',
    loadChildren: () => import('../../pages/reportes/reportes.module').then(m => m.ReportesModule)
  },
  {
    path: 'simulaciones',
    loadChildren: () => import('../../pages/simulaciones/simulaciones.module').then(m => m.SimulacionesModule)
  },
  {
    path: 'sirad',
    loadChildren: () => import('../../pages/sirad/sirad.module').then(m => m.SiradModuleComponent)
  },
]
